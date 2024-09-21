import { useAxios } from '@/app/hooks/useAxios';
import Loading from '@/app/loading';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { FiClock } from 'react-icons/fi';

const AvgDuration = () => {

    const params = useSearchParams()
    const appId = params.get("id")

    const { loading, res, error, sendRequest } = useAxios();

    const handleRequest = async () => {
        await sendRequest({
            method: "POST",
            url: "/api/apps/avg-duration",
            body: { appId: appId },
        });
    };


    useEffect(() => {
        handleRequest()
    }, [])

    console.log(res);

    return (
        <div className="flex flex-col items-center justify-center lg:w-1/4 w-full lg:my-0 my-4">
            {
                !loading ? (
                    <Loading />
                ) : (
                    <>
                        <FiClock className="text-primary text-5xl " />
                        <div className="text-primaryGray  font-dosis text-xl font-medium">Avg. Session Duration</div>
                        <div className="text-primaryGray  font-dosis text-xl">{`${res?.duration?.minutes}m ${res?.duration?.seconds}s`}</div>
                    </>
                )
            }

        </div>
    )
}

export default AvgDuration