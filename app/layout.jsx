import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import { Dosis } from 'next/font/google'
import StoreProvider from "./providers/StoreProvider";
import { SocketProvider } from "./providers/SocketProvider";
import Loading from "./loading";
import { Suspense } from "react";

const dosis = Dosis({ subsets: ['latin'] })

export const metadata = {
  title: "Tuana | AI-Based User Behavior Analysis Platform",
  description: "AI-Based User Behavior Analysis Platform",
};

export default function RootLayout({ children }) {





  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${dosis.className} antialiased bg-main`}>
        <Suspense fallback={<Loading />}>
          <StoreProvider>
            {children}
          </StoreProvider>
        </Suspense>
      </body>

      <Script id="datalayer" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
          function track() {
            dataLayer.push(arguments);
          }
          track("js", new Date());
          track("config", "TNAKLYTP");`}
      </Script>
      <Script async src={`${process.env.NEXT_PUBLIC_SCRIPT_URL}`}/>
    </html>
  );
}
