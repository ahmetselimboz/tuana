import { useAxios } from '@/app/hooks/useAxios';
import useCurrentUser from '@/app/hooks/useCurrentUser';
import Loading from '@/app/loading';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { FiUserPlus } from 'react-icons/fi'

const NewVisitor = () => {

    const params = useSearchParams()
    const appId = params.get("id")

    const { loading, res, error, sendRequest } = useAxios();

    const handleRequest = async () => {
        await sendRequest({
            method: "POST",
            url: "/api/apps/new-visitor",
            body: { appId: appId },
        });
    };

    
    useEffect(() => {
        handleRequest()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center lg:w-1/4 w-full lg:my-0 my-4">
            <FiUserPlus className="text-primary text-5xl " />
            <div className="text-primaryGray font-dosis text-xl font-medium">New Visitors</div>
            {
                loading ? (
                    <Loading width="w-6" height="h-6"/>
                ) : (
                    <>
                        <div className="text-primaryGray font-dosis text-xl">{res?.visitor ?? 0}</div>   
                        </>
                )
            }
        </div>


    )
}

export default NewVisitor