"use client"

import { useAxios } from '@/app/hooks/useAxios'
import Loading from '@/app/loading'
import { useToast } from '@/hooks/use-toast'
import { setUser } from '@/lib/redux/features/userSettings/userSlice'
import { useAppSelector } from '@/lib/redux/hooks'
import { ToastAction } from '@radix-ui/react-toast'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Redirect = () => {


  const { toast } = useToast()
  const router = useRouter()
  const dispatch = useDispatch()

  const { loading, res, error, sendRequest } = useAxios();

  const handleRequest = async () => {
    try {
      await sendRequest({
        method: "GET",
        url: `/api/user/get-user`
      });
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  useEffect(() => {

    if (res !== null) {

      if (res.code !== 200) {
        console.log("redirectte hata var")
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: res?.message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      } else {
        console.log("redirectte hata yok")
        toast({
          variant: "default",
          title: "Success",
          description: "Welcome!",
        })

        if (res?.user?.plans !== "#") {
          router.push('/projects')
        } else {
          router.push('/plans')
        }
      }




    }


  }, [res, error])

  useEffect(() => {
    handleRequest()
  }, [])

  return (
    <>
      <Loading></Loading>
    </>
  )
}

export default Redirect