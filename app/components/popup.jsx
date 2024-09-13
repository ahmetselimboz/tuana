import React, { useEffect } from 'react'
import { IoMdClose } from 'react-icons/io';

const Popup = ({ selectedData, closePopup, isOpen }) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

      
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="w-full bg-black/10 fixed top-0 left-0 h-screen z-50 ">
            <div className='w-full h-full flex flex-col items-center justify-center'>
                <div className='w-[500px] h-[520px]  border border-stone-900/20 relative px-4 py-6 rounded-md shadow-xl bg-main flex flex-col items-center '>

                    {/* <h2>Details</h2>
                    <p>{`You clicked on ${selectedData.label}: ${selectedData.value}`}</p> */}
                    <div className='absolute top-3 right-3'>
                        <button onClick={closePopup}><IoMdClose className='text-stone-900/70 text-1-5xl'/></button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Popup