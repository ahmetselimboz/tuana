import React from 'react'
import { FaRegCircleDot } from 'react-icons/fa6'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'

const ProjectTitles = ({stage}) => {
    return (
        <div className='w-full  flex items-center justify-center pb-8'>
            <div className=' h-[130px] flex flex-col justify-end items-center'>
                <div className='text-3xl w-[170px]  mb-2 text-primaryGray text-center'>
                    Project Details
                </div>
                {
                    stage.phase1 == true ? (
                        <div className={`w-12 h-12 rounded-full border border-primary text-primary bg-main flex items-center justify-center`}>
                            <IoMdCheckmarkCircleOutline className='text-3xl ' />
                        </div>) : (<></>)
                }
                {
                    stage.phase1 == false ? (
                        <div className={`w-12 h-12 rounded-full border  border-primary text-primary bg-main flex items-center justify-center`}>
                            <FaRegCircleDot className='text-2xl ' />
                        </div>) : (<></>)
                }
                {
                    stage.phase1 == null ? (
                        <div className={`w-12 h-12 rounded-full border  border-primaryGray/50 text-primaryGray bg-main flex items-center justify-center`}>
                            <FaRegCircleDot className='text-2xl ' />
                        </div>) : (<></>)
                }

            </div>

            <div className='w-full border border-primary rounded-md mx-4'></div>
            <div className='h-[130px] flex flex-col justify-end items-center'>
                <div className='text-3xl w-fit mb-2 text-primaryGray  text-center'>
                    Installation
                </div>
                {
                    stage.phase3 == true ? (
                        <div className={`w-12 h-12 rounded-full border border-primary text-primary bg-main flex items-center justify-center`}>
                            <IoMdCheckmarkCircleOutline className='text-3xl ' />
                        </div>) : (<></>)
                }
                {
                    stage.phase3 == false ? (
                        <div className={`w-12 h-12 rounded-full border  border-primary text-primary bg-main flex items-center justify-center`}>
                            <FaRegCircleDot className='text-2xl ' />
                        </div>) : (<></>)
                }
                {
                    stage.phase3 == null ? (
                        <div className={`w-12 h-12 rounded-full border  border-primaryGray/50 text-primaryGray bg-main flex items-center justify-center`}>
                            <FaRegCircleDot className='text-2xl ' />
                        </div>) : (<></>)
                }
            </div>
            <div className='w-full border border-primary rounded-md mx-4'></div>
            <div className=' h-[130px] flex flex-col justify-end items-center'>
                <div className='text-3xl w-[200px] mb-2 text-primaryGray text-center'>
                    Verify Installation
                </div>
                {
                    stage.phase4 == true ? (
                        <div className={`w-12 h-12 rounded-full border border-primary text-primary bg-main flex items-center justify-center`}>
                            <IoMdCheckmarkCircleOutline className='text-3xl ' />
                        </div>) : (<></>)
                }
                {
                    stage.phase4 == false ? (
                        <div className={`w-12 h-12 rounded-full border  border-primary text-primary bg-main flex items-center justify-center`}>
                            <FaRegCircleDot className='text-2xl ' />
                        </div>) : (<></>)
                }
                {
                    stage.phase4 == null ? (
                        <div className={`w-12 h-12 rounded-full border  border-primaryGray/50 text-primaryGray bg-main flex items-center justify-center`}>
                            <FaRegCircleDot className='text-2xl ' />
                        </div>) : (<></>)
                }
            </div>
        </div>
    )
}

export default ProjectTitles