import React from 'react'

const ProjectDetails = () => {
    return (
        <div className='relative lg:w-3/6 w-5/6 h-[400px] mb-4 px-10 py-8 flex flex-col  items-center justify-center rounded-md shadow-xl border border-stone-900/20 bg-main  transition-all'>
            <div className=' w-full flex flex-col items-start mb-4 '>
                <label htmlFor="title" className='ml-2 '>Project Name</label>
                <h5 className=' font-light text-primaryGray'>We need a project name:) You can change later if you want</h5>
                <input type="text" value={values.title} onChange={handleChange} placeholder='Enter project name' name='title' id='title' className='w-full rounded-md border border-primaryGray/50 outline-none text-lg px-2 py-1' />
                {touched.title && errors.title && <div className='text-red-600 text-sm'>{errors.title}</div>}
            </div>

            <div className=' w-full flex flex-col items-start mb-8 '>
                <label htmlFor="timezone" className='ml-2 '>Select Timezone:</label>
                <h5 className=' font-light text-primaryGray'>To make sure we agree on what 'today' means</h5>
                <select id="timezone" name='timezone' className='w-full  rounded-md border border-primaryGray/50 outline-none text-base px-2 py-2'>
                    <option value="">Choose a timezone</option>
                    {timezones.map((timezone, index) => (
                        <option key={index} value={timezone.value}>
                            {timezone.text}
                        </option>
                    ))}
                </select>
                {touched.timezone && errors.timezone && <div className='text-red-600 text-sm'>{errors.timezone}</div>}
            </div>
            <div className='w-full flex flex-col items-center'>
                <button onClick={() => {
                    setStage((prevState) => {
                        return {
                            ...prevState,
                            phase1: true
                        };
                    });
                }} className='lg:text-lg text-lg  text-main font-medium font-dosis tracking-wider px-16 py-1 border-2 border-primary rounded-md bg-primary hover:bg-secondary hover:border-secondary transition-all'>Choose Project Type</button>
            </div>
        </div>
    )
}

export default ProjectDetails