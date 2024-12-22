// app/api/auth/callback/google/route.js
import { NextResponse } from "next/server";
import axios from "axios";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import api from "@/app/utils/axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  try {
    // Google'dan access token alın
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/auth/callback/google`,
        grant_type: "authorization_code",
        code,
      }
    );

    const { id_token, access_token } = tokenResponse.data;

    const userInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
    );

    try {
      const data = {
        name: userInfo.data.given_name,
        surname: userInfo.data.family_name,
        email: userInfo.data.email,
        password: "pdCmaCtZg5b24F7IhLMquTF1BcORCEBM1fBIVSb1",
        provider: "google",
      };

      const config = {
        method: "POST",
        url: "/api/user/google-sign-up",
        data: { data: data },
      };

      const res = await api(config);
      console.log("🚀 ~ GET ~ res:", res)

      const user = res.data.data.user;

      if (!user) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/`);
      }

      const accessToken = jwt.sign(
        { id: user },
        process.env.NEXT_PUBLIC_JWT_SECRET,
        {
          expiresIn: "30m",
        }
      );
      const refreshToken = jwt.sign(
        { id: user },
        process.env.NEXT_PUBLIC_JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      const config2 = {
        method: "POST",
        url: "/api/user/save-token",
        data: { token: refreshToken, userId: user },
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      };

      const res2 = await api(config2);

      const response = NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/`
      );

      response.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        path: "/",
      });
      response.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/",
      });

      return response;
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/`);
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/`);
  }
}
