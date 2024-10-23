"use client"

import { useAxios } from '@/app/hooks/useAxios';
import Loading from '@/app/loading';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const EmailConfirmed = () => {
    const { toast } = useToast()
    const { loading, res, error, sendRequest } = useAxios();
 

    const params = useSearchParams()
    const token = params.get("token")

    const handleRequest = async (e) => {
        try {
            await sendRequest({
                method: "GET",
                url: `/api/user/email-confirmed?token=${token}`,

            });
        } catch (error) {
            console.error("Request failed:", error);
        }
    };
    useEffect(() => {
        handleRequest()
    }, [])

    useEffect(() => {

        if (error !== null) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error?.message,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }

        if (res !== null) {
            toast({
                variant: "default",
                title: "Success",
                description: res?.message,
            })

        }


    }, [res, error])


    if (loading) {
       return <Loading></Loading>
    }


    if (error) {
        return (
            <div className='w-full h-full flex flex-col items-center justify-center py-8'>
                <div className='lg:w-auto lg:h-full w-5/6 h-auto mt-26 overflow-hidden'>
                    <Image src="/emailnotconfirmed.svg" alt="login" className="w-full h-full" width="1000" height="1000" priority />
                </div>
                <div className='w-full flex flex-col items-center justify-center'>
                    <div className='w-fit text-5xl font-medium text-primary mb-2 font-dosis'>
                        Email Couldn't Be Confirmed!
                    </div>
                    <div className='w*fıt text-2xl font-semilight text-primaryGray mb-6 font-dosis lg:px-0 px-4 text-center'>
                    You can log in again to start exploring your Analytics data
                    </div>
                    <Link href="/sign-up" className='lg:text-xl text-lg  text-main font-medium font-dosis tracking-wider px-16 py-2 border-2 font-dosis border-primary rounded-md bg-primary hover:bg-secondary hover:border-secondary transition-all'>Sign Up Again</Link>

                </div>
            </div>
        )
    }


    return (
        <div className='w-full h-full flex flex-col items-center justify-center py-8'>
            <div className='lg:w-auto lg:h-full w-5/6 h-auto mt-26 overflow-hidden'>
                <Image src="/emailconfirmed.svg" alt="login" className="w-full h-full" width="1000" height="1000" priority />
            </div>
            <div className='w-full flex flex-col items-center justify-center'>
                <div className='w-fit text-5xl font-medium text-primary mb-2 font-dosis'>
                    Email Confirmed!
                </div>
                <div className='w*fıt text-2xl font-semilight text-primaryGray mb-6 font-dosis lg:px-0 px-4 text-center'>
                    Start exploring your analytics by logging in to Tuana
                </div>
                <Link href="/login" className='lg:text-xl text-lg  text-main font-medium font-dosis tracking-wider px-16 py-2 border-2 font-dosis border-primary rounded-md bg-primary hover:bg-secondary hover:border-secondary transition-all'>Get Started</Link>

            </div>
        </div>
    )
}

export default EmailConfirmed