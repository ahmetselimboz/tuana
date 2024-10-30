import { useAxios } from '@/app/hooks/useAxios';
import React, { useEffect, useState } from 'react'
import { FaRegCircleDot } from 'react-icons/fa6'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'

const ProjectDetails = ({setAppDetails, setStage}) => {

    const [timezones, setTimezones] = useState([]);

    const { loading, res, error, sendRequest } = useAxios();

    const handleRequest = async () => {
        try {
            await sendRequest({
                method: "GET",
                url: `/api/user/get-appid`,

            });
        } catch (error) {
            console.error("Request failed:", error);
        }
    };

    useEffect(() => {

    
        if (res !== null) {
            setStage((prevState) => ({
                ...prevState,
                phase1: true,
                phase3: false
            }));
            setAppDetails((prevState) => ({
                ...prevState,
                appId: res?.appId
            }));

        }


    }, [res, error])
    
    useEffect(() => {
        const fetchTimezones = async () => {
            try {
                const response = await fetch('/timezone.json');
                const data = await response.json();
                setTimezones(data);
            } catch (error) {
                console.error('Error fetching timezones:', error);
            }
        };

        fetchTimezones();
    }, []);



    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleRequest();
            }}
            className='relative lg:w-3/6 w-5/6 h-[400px] mb-4 px-10 py-8 flex flex-col items-center justify-center rounded-md shadow-xl border border-stone-900/20 bg-main transition-all'
        >
            <div className='w-full flex flex-col items-start mb-4'>
                <label htmlFor="project_name" className='ml-2'>Project Name</label>
                <h5 className='font-light text-primaryGray'>We need a project name :) You can change it later if you want</h5>
                <input
                    type="text"
                    onChange={(e) => setAppDetails((prevState) => ({
                        ...prevState,
                        project_name: e.target.value
                    }))}
                    placeholder='Enter project name'
                    name='project_name'
                    id='project_name'
                    className='w-full rounded-md border border-primaryGray/50 outline-none text-lg px-2 py-1'
                    required
                />
            </div>

            <div className='w-full flex flex-col items-start mb-8'>
                <label htmlFor="timezone" className='ml-2'>Select Timezone</label>
                <h5 className='font-light text-primaryGray'>To make sure we agree on what "today" means</h5>
                <select
                    id="timezone"
                    name='timezone'
                    onChange={(e) =>
                        setAppDetails((prevState) => ({
                            ...prevState,
                            timezone: e.target.value
                        }))
                    }
                    className='w-full rounded-md border border-primaryGray/50 outline-none text-base px-2 py-2'
                    required
                >
                    <option value="">Choose a timezone</option>
                    {timezones.map((timezone, index) => (
                        <option key={index} value={timezone.text}>
                            {timezone.text}
                        </option>
                    ))}
                </select>
            </div>

            <div className='w-full flex flex-col items-center'>
                <button type='submit'
                    className='lg:text-lg text-lg text-main font-medium font-dosis tracking-wider px-16 py-1 border-2 border-primary rounded-md bg-primary hover:bg-secondary hover:border-secondary transition-all'
                >
                    Choose Project Type
                </button>
            </div>
        </form>
    )
}

export default ProjectDetails