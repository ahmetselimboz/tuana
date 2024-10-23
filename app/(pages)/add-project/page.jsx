"use client"
import ProfileNavbar from '@/app/components/Navbar/profileNavbar'
import useWidth from '@/app/hooks/useWidth'
import React, { useEffect, useState } from 'react'
import Footer from "@/app/components/Footer/footer"
import { useFormik } from 'formik'
import { FaRegCircleDot } from 'react-icons/fa6'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { TbWorld } from 'react-icons/tb'



const AddProject = () => {
    const [adsActive, setAdsActive] = useState(false)
    const [stage, setStage] = useState({
        phase1: false,
        phase3: null,
        phase4: null,
    })

    const [projectType, setProjectType] = useState("Web")

    const [appDetails, setAppDetails] = useState({
        project_name: "",
        timezone: "",
        type: "",
        appId: "===",

    })

    const codeScript = ` <script>
    window.dataLayer = window.dataLayer || [];
    function track() {
      dataLayer.push(arguments);
    }
    track("js", new Date());
    track("config", "${appDetails.appId}");
  </script>

  <script async src="https://cdn.tuanalytics.com/script/track.js"></script>`


    const { width } = useWidth()

    const [timezones, setTimezones] = useState([]);

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

    useEffect(() => {
        console.log("🚀 ~ AddProject ~ stage:", projectType)
    }, [projectType])

    const formik = useFormik({
        initialValues: {
            project_name: "",
            timezone: "",
            type: ""
        },

        onSubmit: async (values) => {
            setAppDetails((prevState) => {
                return {
                    ...prevState,
                    values
                }
            })
        },
    });


    const { errors, touched, values, handleChange, handleSubmit } = formik;



    return (
        <>
            <ProfileNavbar></ProfileNavbar>
            <div className='w-full h-auto flex items-center py-24'>
                <div className='lg:block hidden w-1/6 h-full px-4 '>
                    {
                        adsActive ? (
                            <>
                                <div className="w-full h-[600px] bg-primaryGray flex items-center justify-center mb-8 rounded-md overflow-hidden">
                                    <div className="text-main font-dosis text-2xl">Ad space</div>
                                </div>

                            </>
                        ) : (
                            <div></div>
                        )
                    }
                </div>
                <div className='lg:w-4/6 w-full flex flex-col items-center justify-center'>


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

                    <div className='border-2 border-primaryGray/20 w-5/6 rounded-full mt-1'></div>

                    <div className='w-full h-auto flex flex-col items-center my-6'>
                        {
                            stage.phase1 == false && stage.phase1 !== null ? (<div className='relative lg:w-3/6 w-5/6 h-[400px] mb-4 px-10 py-8 flex flex-col  items-center justify-center rounded-md shadow-xl border border-stone-900/20 bg-main  transition-all'>
                                <div className=' w-full flex flex-col items-start mb-4 '>
                                    <label htmlFor="project_name" className='ml-2 '>Project Name</label>
                                    <h5 className=' font-light text-primaryGray'>We need a project name:) You can change later if you want</h5>
                                    <input type="text" value={values.project_name} onChange={handleChange} placeholder='Enter project name' name='project_name' id='project_name' className='w-full rounded-md border border-primaryGray/50 outline-none text-lg px-2 py-1' />
                                    {touched.project_name && errors.project_name && <div className='text-red-600 text-sm'>{errors.project_name}</div>}
                                </div>

                                <div className=' w-full flex flex-col items-start mb-8 '>
                                    <label htmlFor="timezone" className='ml-2 '>Select Timezone</label>
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
                                                phase1: true,
                                                phase3: false
                                            };
                                        });
                                    }} className='lg:text-lg text-lg  text-main font-medium font-dosis tracking-wider px-16 py-1 border-2 border-primary rounded-md bg-primary hover:bg-secondary hover:border-secondary transition-all'>Choose Project Type</button>
                                </div>
                            </div>
                            ) : (<></>)
                        }


                        {
                            stage.phase3 == false && stage.phase3 !== null ? (<div className='relative lg:w-3/6 w-5/6 h-fit mb-4 px-10 py-8 flex flex-col  items-center justify-between rounded-md shadow-xl border border-stone-900/20 bg-main  transition-all'>
                                <div className='w-full flex items-center mb-8'>
                                    <div onClick={() => { setProjectType("Web") }} className={`w-1/3 flex items-center justify-center rounded-md border-2 ${projectType == "Web" ? "border-primary shadow-md" : "border-primaryGray/50"} px-2 py-1 mr-2 cursor-pointer`}>
                                        <TbWorld className='text-2xl text-primary mr-1' />
                                        <div className='text-xl'>Web</div>
                                    </div>

                                    <div onClick={() => { setProjectType("Android") }} className={`w-1/3 flex items-center justify-center rounded-md border-2 ${projectType == "Android" ? "border-primary shadow-md" : "border-primaryGray/50"} px-2 py-1 mr-2 cursor-pointer`}>
                                        <TbWorld className='text-2xl text-primary mr-1' />
                                        <div className='text-xl'>Android</div>
                                    </div>

                                    <div onClick={() => { setProjectType("IOS") }} className={`w-1/3 flex items-center justify-center rounded-md border-2 ${projectType == "IOS" ? "border-primary shadow-md" : "border-primaryGray/50"}  px-2 py-1 mr-2 cursor-pointer`}>
                                        <TbWorld className='text-2xl text-primary mr-1' />
                                        <div className='text-xl'>IOS</div>
                                    </div>
                                </div>
                                {
                                    projectType === "Web" ? (
                                        <div className='w-full flex flex-col items-start mb-4'>
                                            <div className=' w-full flex flex-col items-start mb-4 '>
                                                <label htmlFor="domain" className='ml-2 '>Domain</label>
                                                <h5 className=' font-light text-primaryGray'>We need a project name:) You can change later if you want</h5>
                                                <input type="text" value={values.domain} onChange={handleChange} placeholder='Enter domain' name='domain' id='domain' className='w-full rounded-md border border-primaryGray/50 outline-none text-lg px-2 py-1' />
                                                {touched.domain && errors.domain && <div className='text-red-600 text-sm'>{errors.domain}</div>}
                                            </div>
                                            <div className='w-full flex flex-col items-start mb-4'>
                                                <label htmlFor="code" className='ml-2 '>Code</label>
                                                <h5 className=' font-light text-primaryGray'>We need a project name:) You can change later if you want</h5>
                                                <textarea
                                                    readOnly
                                                    rows="12"
                                                    cols="50"
                                                    placeholder="Enter code"
                                                    name="code"
                                                    id="code"
                                                    className="w-full rounded-md border border-primaryGray/50 outline-none text-base px-2 py-1"
                                                    value={codeScript}
                                                />                                                {/* <input type="text" value={codeScript}  placeholder='Enter code' name='code' id='code' className='w-full h-fit rounded-md border border-primaryGray/50 outline-none text-lg px-2 py-1' readonly ></input> */}

                                            </div>
                                        </div>
                                    ) : (<></>)
                                }

                                <div className='w-full flex flex-col items-center'>
                                    <button onClick={() => {
                                        setStage((prevState) => {
                                            return {
                                                ...prevState,
                                                phase3: true,
                                                phase4: false
                                            };
                                        });
                                    }} className='lg:text-lg text-lg  text-main font-medium font-dosis tracking-wider px-16 py-1 border-2 border-primary rounded-md bg-primary hover:bg-secondary hover:border-secondary transition-all'>Verify Installation</button>
                                </div>
                            </div>
                            ) : (<></>)
                        }

                        {
                            stage.phase4 == false && stage.phase4 !== null ? (<div className='relative lg:w-3/6 w-5/6 h-[400px] mb-4 px-10 py-8 flex flex-col  items-center justify-center rounded-md shadow-xl border border-stone-900/20 bg-main  transition-all'>
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

                                                phase4: true
                                            };
                                        });
                                    }} className='lg:text-lg text-lg  text-main font-medium font-dosis tracking-wider px-16 py-1 border-2 border-primary rounded-md bg-primary hover:bg-secondary hover:border-secondary transition-all'>Start</button>
                                </div>
                            </div>
                            ) : (<></>)
                        }

                    </div>
                </div>
                <div className='lg:block hidden w-1/6 h-full px-4'>
                    {
                        adsActive ? (
                            <>
                                <div className="w-full h-[600px] bg-primaryGray flex items-center justify-center mb-8 rounded-md overflow-hidden">
                                    <div className="text-main font-dosis text-2xl">Ad space</div>
                                </div>

                            </>
                        ) : (
                            <div></div>
                        )
                    }
                </div>


            </div>
            <div className="w-full h-fit flex">

                <div className="w-full h-full">
                    <Footer></Footer>
                </div>
            </div>
        </>

    )
}

export default AddProject