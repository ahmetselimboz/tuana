"use client";
import { useEffect, useRef } from "react";
import { Provider, useDispatch } from "react-redux";
import { makeStore } from "../../lib/redux/store";
import { useAppSelector } from "@/lib/redux/hooks";
import { useAxios } from "../hooks/useAxios";
import { useToast } from "@/hooks/use-toast";
import { setUser } from "@/lib/redux/features/userSettings/userSlice";

export default function StoreProvider({ children }) {
  const storeRef = useRef();

  
  const { toast } = useToast()
  // const dispatch = useDispatch  ()
  // const token = localStorage.getItem('accessToken')
  // const { loading, res, error, sendRequest } = useAxios();

  
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  // const handleRequest = async () => {
  //     try {
  //         await sendRequest({
  //             method: "GET",
  //             url: `/api/user/get-user`
  //         });
  //     } catch (error) {
  //         console.error("Request failed:", error);
  //     }
  // };

  // useEffect(() => {

  //     if (error !== null) {

  //         toast({
  //             variant: "destructive",
  //             title: "Uh oh! Something went wrong.",
  //             description: error?.message,
  //             action: <ToastAction altText="Try again">Try again</ToastAction>,
  //         })
  //     }

  //     if (res !== null) {
  //       storeRef.current?.dispatch(setUser(res?.user))
  //     }

  // }, [res, error])

  // useEffect(() => {
  //   if (token) {
  //     handleRequest()
  //   }
  // }, [token])
  

  return <Provider store={storeRef.current}>{children}</Provider>;
}
