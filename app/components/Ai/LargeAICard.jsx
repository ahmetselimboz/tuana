import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { IoSend } from 'react-icons/io5'
import MySlider from './MySlider'
import ChatField from './ChatField'

const LargeAICard = ({ closePopup }) => {
    return (
        <div className='lg:w-[600px] w-full h-[450px] relative rounded-md  shadow-xl border border-stone-900/20  bg-main '>
            <button onClick={closePopup}><IoMdClose className='text-stone-900/70 absolute top-3 right-3  text-1-5xl transition-all hover:text-stone-900' /></button>
            <div className="text-primary font-dosis text-3xl  font-medium mb-3 pl-8">
                Ask Tuan-AI
                <hr className="border-b-2 border-primary w-[38px]" />
            </div>
            <div className='w-full flex items-center justify-center px-8'>

            <MySlider></MySlider>
            </div>
          <ChatField></ChatField>


            
        </div>
    )
}

export default LargeAICard