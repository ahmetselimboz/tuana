"use client"
import ProfileNavbar from '@/app/components/Navbar/profileNavbar'
import useWidth from '@/app/hooks/useWidth'
import React, { useEffect, useState } from 'react'
import Footer from "@/app/components/Footer/footer"
import ProjectDetails from '@/app/components/Add-Project/projectdetails'
import ProjectTitles from '@/app/components/Add-Project/projecttitles'
import Installation from '@/app/components/Add-Project/installation'
import Verifying from '@/app/components/Add-Project/verifying'



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
        domain: ""

    })

 


    const { width } = useWidth()

  


    useEffect(() => {
        console.log("🚀 ~ AddProject ~ stage:", stage)
    }, [stage])


  

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


                    <ProjectTitles stage={stage}></ProjectTitles>

                    <div className='border-2 border-primaryGray/20 w-5/6 rounded-full mt-1'></div>

                    <div className='w-full h-auto flex flex-col items-center my-6'>
                        {
                            stage.phase1 == false && stage.phase1 !== null ? (
                                <ProjectDetails setAppDetails={setAppDetails} setStage={setStage} ></ProjectDetails>
                            ) : (<></>)
                        }


                        {
                            stage.phase3 == false && stage.phase3 !== null ? (
                                <Installation appDetails={appDetails} setStage={setStage} setAppDetails={setAppDetails} setProjectType={setProjectType} projectType={projectType}></Installation>
                            ) : (<></>)
                        }

                        {
                            stage.phase4 == false && stage.phase4 !== null ? (
                                <Verifying appDetails={appDetails} setStage={setStage}></Verifying>
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