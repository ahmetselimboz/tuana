import React, { useState } from 'react'
import { HiOutlineSparkles } from 'react-icons/hi'
import Popup from '../popup';
import { IoMdClose } from 'react-icons/io';
import Dropdown from '../Animation/dropdown';
import LargeAICard from './LargeAICard';
import SmallAICard from './SmallAICard';

const LargeAIBtn = ({userInfo, chatField=true }) => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div className='flex lg:items-end lg:w-auto w-full items-center justify-center flex-col relative'>


      <div onClick={() => { setIsPopupOpen(!isPopupOpen) }} className='w-fit h-12 rounded-full cursor-pointer transition-all px-4 hover:w-fit text-2xl text-primary hover:text-main hover:bg-gradient-to-b hover:from-primary hover:to-primary shadow-lg hover:shadow-xl bg-gradient-to-b from-main to-zinc-200  border-2 border-primary flex items-center justify-center flex-row'>
        <h3 className='font-dosis mr-2 text-2xl'>Ask AI</h3>
        <HiOutlineSparkles className='' />

      </div>
      <Dropdown isOpen={isPopupOpen} classw=" absolute lg:top-20 top-20 z-10 lg:w-auto w-full l">

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

export default LargeAIBtn