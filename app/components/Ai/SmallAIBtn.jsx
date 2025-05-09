import React, { useState } from 'react'
import { HiOutlineSparkles } from 'react-icons/hi';
import Dropdown from '../Animation/dropdown';
import { IoMdClose } from 'react-icons/io';
import SmallAICard from './SmallAICard';
import LargeAICard from './LargeAICard';

const SmallAIBtn = ({userInfo, chatField }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div className='flex items-end lg:w-auto w-full  justify-center flex-col relative'>


      <div onClick={() => { setIsPopupOpen(!isPopupOpen) }} className='w-10 h-10 rounded-full cursor-pointer transition-all mr-2  text-2xl text-primary hover:text-main hover:bg-gradient-to-b hover:from-primary hover:to-primary shadow-lg hover:shadow-xl bg-gradient-to-b from-main to-zinc-200  border-2 border-primary flex items-center justify-center flex-row'>
        {/* <h3 className='font-dosis mr-2 text-2xl'>Ask AI</h3> */}
        <HiOutlineSparkles className='' />

      </div>
      <Dropdown isOpen={isPopupOpen} classw=" absolute lg:top-16 top-16 z-10 lg:w-auto w-full l">

        {isPopupOpen && (
          chatField ? (
            <LargeAICard userInfo={userInfo} closePopup={closePopup}></LargeAICard>
          ) : (
            <SmallAICard userInfo={userInfo} closePopup={closePopup}></SmallAICard>
          )
        )}
      </Dropdown>
    </div>
  )
}

export default SmallAIBtn