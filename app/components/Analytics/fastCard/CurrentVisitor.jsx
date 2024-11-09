import useCurrentUser from '@/app/hooks/useCurrentUser'
import Loading from '@/app/loading'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { HiStatusOnline } from 'react-icons/hi'

const CurrentVisitor = () => {

    const params = useSearchParams()
    const appId = params.get("id")

    const { activeUsers, loading } = useCurrentUser(appId);


    return (
        <div className="flex flex-col items-center justify-center lg:w-1/4 w-full lg:my-0 my-4">
            <HiStatusOnline className="text-primary text-5xl animate-blink" />
            <div className="text-primaryGray  font-dosis text-xl font-medium">Current Visitors</div>
            {
                loading ? (
                    <Loading width="w-6" height="h-6"/>
                ) : (
                    <>
                        <div className="text-primaryGray  font-dosis text-xl">{activeUsers == undefined ? 0 : activeUsers}</div>
                    </>
                )
            }

        </div>
    )
}

export default CurrentVisitor