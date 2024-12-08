import React from 'react'
import ChatField from './ChatField'

const FullsizeChatField = ({ userInfo, isFullScreen }) => {
    return (
        <div className='w-screen h-screen bg-black/50 flex items-center justify-center fixed top-0 right-0 z-50 overflow-hidden overscroll-none'>
            <div className=' w-5/6 h-5/6 rounded-md shadow-xl border border-stone-900/20 bg-main'>
                <ChatField userInfo={userInfo} isFullScreen={isFullScreen}></ChatField>
            </div>
        </div>
    )
}

export default FullsizeChatField