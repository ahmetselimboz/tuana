import React, { useState } from 'react'
import { HiOutlineSparkles } from 'react-icons/hi';
import Dropdown from '../Animation/dropdown';
import { IoMdClose } from 'react-icons/io';

const SmallAIBtn = () => {
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
          <div className='lg:w-[468px] w-full h-[336px] rounded-md  shadow-xl border border-stone-900/20   bg-main '>
            <div className='flex items-center justify-end p-4'>
              <button onClick={closePopup}><IoMdClose className='text-stone-900/70 text-1-5xl transition-all hover:text-stone-900' /></button>
            </div>
          </div>
        )}
      </Dropdown>
    </div>
  )
}

export default SmallAIBtn