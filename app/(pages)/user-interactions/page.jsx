"use client"
import { useAxios } from '@/app/hooks/useAxios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import h337 from 'heatmap.js';
import Sidebar from "@/app/components/Analytics/sidebar"
import { useAppSelector } from '@/lib/redux/hooks';
import useWidth from '@/app/hooks/useWidth';
import { useToast } from '@/hooks/use-toast';
import AuthenticatedNavbar from "@/app/components/Navbar/authenticatednavbar"
import FullsizeChatField from '@/app/components/Ai/FullsizeChatField';
import Footer from "@/app/components/Footer/footer"

const UserInteractions = () => {
  const date = useAppSelector((state) => state.dateSettings)
  const [heatmapData, setHeatmapData] = useState([]);
  const params = useSearchParams()
  const appId = params.get("id")

  const [adsActive, setAdsActive] = useState(false)
  const { width } = useWidth()
  const { toast } = useToast()
  const [isMounted, setIsMounted] = useState(false);
  const isFullScreen = useAppSelector((state) => state.chatSettings.isChatFullscreen)
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const closePopup = () => setIsPopupOpen(false);
  const [userInfo, setUserInfo] = useState("")

  const { loading, res, error, sendRequest } = useAxios();

  const handleRequest = async () => {
    await sendRequest({
      method: "POST",
      url: `/api/apps/get-heatmap`,
      body: {
        appId: appId,
        query: {
          firstdate: date.firstDate,
          lastdate: date.lastDate
        }
      },
    });
  };

  useEffect(() => {
    handleRequest()
  }, [])


  useEffect(() => {
    if (loading) {

      setHeatmapData(res?.movements)

      console.log("🚀 ~ useEffect ~ res?.movements:", res?.movements)

    }
  }, [res, loading])
  useEffect(() => {
    heatmapData?.forEach((page, index) => {
      const container = document.getElementById(`heatmap-${index}`);
      const containerWidth = container.offsetWidth; // Konteyner genişliği
      const containerHeight = container.offsetHeight; // Konteyner yüksekliği

      // Heatmap.js oluştur
      const heatmapInstance = h337.create({
        container,
        radius: 30, // Nokta yarıçapı
        maxOpacity: 0.8,
        minOpacity: 0.2,
        blur: 0.75,
      });

      // Koordinatları ölçeklendir
      const points = page.movements.map((point) => {
        const originalWidth = 1536; // Ekran genişliği (default: 1536)
        const originalHeight = 864; // Ekran yüksekliği (default: 864)

        return {
          x: Math.round((point.x / originalWidth) * containerWidth), // Dinamik genişlik ölçeklendirme ve tam sayıya yuvarlama
          y: Math.round((point.y / originalHeight) * containerHeight), // Dinamik yükseklik ölçeklendirme ve tam sayıya yuvarlama
          value: 1,
        };
      });

      console.log("🚀 ~ points ~ points:", points)
      // Veriyi ayarla
      heatmapInstance.setData({
        max: 5,
        data: points,
      });
    });
  }, [heatmapData]);


  return (
    <>
      {
        isFullScreen ? (
          <div className='relative z-40'>
            <FullsizeChatField
              userInfo={userInfo}
              setIsPopupOpen={setIsPopupOpen}
            ></FullsizeChatField>
          </div>

        ) : null



      }

      <div className=' w-full h-auto bg-main'>
        <AuthenticatedNavbar />
        <div className="w-full h-20"></div>
        <div className="w-full h-full flex items-start relative mb-6">
          {
            width <= 1024 ? (<div></div>) : (<Sidebar closePopup={closePopup} setIsPopupOpen={setIsPopupOpen} isPopupOpen={isPopupOpen}></Sidebar>)
          }
          <div className="lg:w-4/6 w-full flex flex-col lg:ml-[16.67%] px-8 py-4">
            <div className='w-full h-[800px]'>
              <div className="w-full flex items-center ">
                {heatmapData?.map((page, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center bg-gray-100 shadow-md rounded-lg p-4 w-1/3 mr-2"
                  >
                    {/* URL Başlığı */}
                    <h3 className="text-lg font-semibold mb-4">{page.url}</h3>

                    {/* Heatmap Konteyneri */}
                    <div
                      id={`heatmap-${index}`}
                      className="relative w-full h-[150px] border rounded-lg "
                    >

                      <img src="/test.png" alt="" className='w-full h-full' />
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:block hidden w-1/6 h-full px-4">
            <div className="w-full h-20"></div>
            {
              adsActive ? (
                <>
                  <div className="w-full h-[700px] bg-primaryGray flex items-center justify-center mb-8 rounded-md overflow-hidden">
                    <div className="text-main font-dosis text-2xl">Ad space</div>
                  </div>
                  <div className="w-full h-[700px] bg-primaryGray flex items-center justify-center mb-8 rounded-md overflow-hidden">
                    <div className="text-main font-dosis text-2xl">Ad space</div>
                  </div>
                  <div className="w-full h-[700px] bg-primaryGray flex items-center justify-center mb-8 rounded-md overflow-hidden">
                    <div className="text-main font-dosis text-2xl">Ad space</div>
                  </div>
                </>
              ) : (
                <div></div>
              )
            }

          </div>
        </div>
      </div>
      <div className="w-full h-fit flex">
        <div className="lg:block hidden w-1/6 h-full"></div>
        <div className="lg:w-5/6 w-full h-full">
          <Footer></Footer>
        </div>
      </div>
    </>
  )
}

export default UserInteractions