import React, { useEffect, useState } from 'react'
import { HiOutlineSparkles } from 'react-icons/hi'
import Popup from '../popup';
import { IoMdClose } from 'react-icons/io';
import Dropdown from '../Animation/dropdown';
import LargeAICard from './LargeAICard';
import SmallAICard from './SmallAICard';
import FullsizeChatField from './FullsizeChatField';

const LargeAIBtn = ({ userInfo, chatField = true, closePopup, setIsPopupOpen, isPopupOpen }) => {




  return (


    <div className='flex lg:items-end lg:w-full w-full items-center justify-center flex-col relative '>


      <div onClick={() => { setIsPopupOpen(!isPopupOpen) }} className='lg:w-full w-fit h-12 rounded-lg cursor-pointer transition-all px-4  text-2xl text-primary hover:text-main hover:bg-gradient-to-b hover:from-primary hover:to-primary shadow-lg hover:shadow-xl bg-gradient-to-b from-main to-zinc-200  border-2 border-primary flex items-center justify-center flex-row'>
        <HiOutlineSparkles className='mr-2' />
        <h3 className='font-dosis  text-2xl'>Ask AI</h3>

      </div>

      <Dropdown isOpen={isPopupOpen} classw={` absolute lg:top-5 top-20 z-20 lg:left-full lg:ml-4   lg:w-auto w-full`}>

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