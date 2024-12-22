import React from 'react'
import { ThreeDCardFirst } from './Why-Cards/ThreeDCardFirst'
import { ThreeDCardSecond } from './Why-Cards/ThreeDCardSecond'
import { ThreeDCardThird } from './Why-Cards/ThreeDCardThird'
import { ThreeDCardFirstV2 } from './Why-Cards/ThreeDCardFirstV2'

const ThreeDCard = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center mb-10'>
      <div className='w-5/6 flex items-start justify-between lg:px-12 mb-16'>
        <ThreeDCardFirstV2></ThreeDCardFirstV2>
      </div>
      <div className='w-5/6 flex  items-start justify-between lg:px-12 mb-16'>
        <ThreeDCardSecond></ThreeDCardSecond>
      </div>
      <div className='w-5/6 flex  items-start justify-between lg:px-12 mb-16'>
        <ThreeDCardThird></ThreeDCardThird>
      </div>

    </div>
  )
}

export default ThreeDCard