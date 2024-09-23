import { useAxios } from '@/app/hooks/useAxios'
import Loading from '@/app/loading'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { AiOutlineFundView } from 'react-icons/ai'

const TopPage = () => {

    const params = useSearchParams()
    const appId = params.get("id")

    const { loading, res, error, sendRequest } = useAxios();

    const handleRequest = async () => {
        await sendRequest({
            method: "POST",
            url: "/api/apps/top-page",
            body: { appId: appId },
        });
    };


    useEffect(() => {
        handleRequest()
    }, [])


    return (
        <div className="flex flex-col items-center justify-center lg:w-1/4 w-full lg:my-0 my-4">
            <AiOutlineFundView className="text-primary text-5xl " />
            <div className="text-primaryGray  font-dosis text-xl font-medium">Top Viewed Page</div>
            {
                !loading ? (
                    <Loading width="w-6" height="h-6"/>
                ) : (
                    <>
                        <div className="text-primaryGray  font-dosis text-xl">{res?.url || "---"}</div>
                    </>
                )
            }
        </div>
    )
}

export default TopPage