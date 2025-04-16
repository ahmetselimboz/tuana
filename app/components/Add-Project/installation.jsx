import { useAxios } from '@/app/hooks/useAxios';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import React, { useEffect } from 'react'
import { IoIosAppstore, IoLogoAndroid } from 'react-icons/io';
import { TbWorld } from 'react-icons/tb';

const Installation = ({ setStage, setAppDetails, setProjectType, appDetails, projectType }) => {

    const { toast } = useToast()
    const { loading, res, error, sendRequest } = useAxios();
    // const { loading: loading2, res: res2, error: error2, sendRequest: sendRequest2 } = useAxios();


    const handleRequest = async (e) => {
        try {
            await sendRequest({
                method: "POST",
                url: `/api/apps/exist-domain`,
                body: { domain: e }
            });
        } catch (error) {
            console.error("Request failed:", error);
        }
    };


    // useEffect(() => {
    //     console.log("🚀 ~ useEffect ~ res:", res)
    // }, [res])

    const codeScript = ` <script>
    window.dataLayer = window.dataLayer || [];
    function track() {
      dataLayer.push(arguments);
    }
    track("domain", "${appDetails.domain}");
    track("config", "${appDetails.appId}");
  </script>

  <script async src="${process.env.NEXT_PUBLIC_SCRIPT_URL}"></script>`


    useEffect(() => {
        setAppDetails((prevState) => ({
            ...prevState,
            type: projectType,
        }));
    }, [projectType])

    useEffect(()=>{

        handleRequest(appDetails.domain)
    },[])


    return (
        <form onSubmit={(e) => {
            setStage((prevState) => {
                return {
                    ...prevState,
                    phase3: true,
                    phase4: false
                };
            });

        }} className='relative lg:w-3/6 w-5/6 h-fit mb-4 px-10 py-8 flex flex-col  items-center justify-between rounded-md shadow-xl border border-stone-900/20 bg-main  transition-all'>
            <div className='w-full flex items-center mb-8'>
                <div onClick={() => { setProjectType("Web") }} className={`w-1/3 flex items-center justify-center rounded-md border-2 ${projectType == "Web" ? "border-primary shadow-md" : "border-primaryGray/50"} px-2 py-1 mr-2 cursor-pointer`}>
                    <TbWorld className='text-2xl text-primary mr-1' />
                    <div className='text-xl'>Web</div>
                </div>

                <div onClick={() => { setProjectType("Android") }} className={`w-1/3 flex items-center justify-center rounded-md border-2 ${projectType == "Android" ? "border-primary shadow-md" : "border-primaryGray/50"} px-2 py-1 mr-2 cursor-pointer`}>
                    <IoLogoAndroid className='text-2xl text-primary mr-1' />
                    <div className='text-xl'>Android</div>
                </div>

                <div onClick={() => { setProjectType("IOS") }} className={`w-1/3 flex items-center justify-center rounded-md border-2 ${projectType == "IOS" ? "border-primary shadow-md" : "border-primaryGray/50"}  px-2 py-1 mr-2 cursor-pointer`}>
                    <IoIosAppstore className='text-2xl text-primary mr-1' />
                    <div className='text-xl'>IOS</div>
                </div>
            </div>
            {
                projectType === "Web" ? (
                    <div className='w-full flex flex-col items-start mb-4'>
                        <div className=' w-full flex flex-col items-start mb-4 '>
                            <label htmlFor="domain" className='ml-2 '>Domain</label>
                            <h5 className=' font-light text-primaryGray'>Just the naked domain or subdomain without 'www', 'https' etc.</h5>
                            <input type="text" value={appDetails.domain} onChange={(e) => {
                                setAppDetails((prevState) => ({
                                    ...prevState,
                                    domain: e.target.value
                                }));
                                e.preventDefault()
                                handleRequest(e.target.value)
                            }} placeholder='Enter domain' name='domain' id='domain' className='w-full rounded-md border border-primaryGray/50 outline-none text-lg px-2 py-1' required />

                            {
                                res?.code == 200 ? (
                                    <div className='text-green-600 text-sm'>{res?.message}</div>
                                ) : (<div className='text-red-600 text-sm'>{res?.message}</div>)
                            }


                        </div>
                        <div className='w-full flex flex-col items-start mb-4'>
                            <label htmlFor="code" className='ml-2 '>Snippet</label>
                            <h5 className=' font-light text-primaryGray'>Paste this snippet into the body tag  of your site. Once done, click the button below to verify your installation.</h5>
                            <textarea
                                readOnly
                                rows="12"
                                cols="50"
                                placeholder="Enter code"
                                name="code"
                                id="code"
                                className={`w-full rounded-md border border-primaryGray/50 outline-none text-base px-2 py-1 ${res?.code == 200 ? "cursor-text" : "pointer-events-none text-black/30"}`}
                                value={codeScript}
                                disabled
                            />

                        </div>
                    </div>
                ) : (<></>)
            }

            <div className='w-full flex flex-col items-center'>
                <button type='submit' className={`lg:text-lg text-lg ${res?.code !== 200 ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} text-main font-medium font-dosis tracking-wider px-16 py-1 border-2 border-primary rounded-md bg-primary hover:bg-secondary hover:border-secondary transition-all`}>Verify Installation</button>
            </div>
        </form>
    )
}

export default Installation