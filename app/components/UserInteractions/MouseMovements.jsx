import { useAxios } from '@/app/hooks/useAxios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import h337 from 'heatmap.js';
import { useAppSelector } from '@/lib/redux/hooks';
import useWidth from '@/app/hooks/useWidth';
import { useToast } from '@/hooks/use-toast';


const MouseMovements = () => {
    const date = useAppSelector((state) => state.dateSettings)
    const [heatmapData, setHeatmapData] = useState([]);
    const params = useSearchParams()
    const appId = params.get("id")
  
    const { loading, res, error, sendRequest } = useAxios();
  
    const handleRequest = async () => {
      await sendRequest({
        method: "POST",
        url: `/api/apps/get-mouse-movements`,
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
    }, [date])
  
  
    useEffect(() => {
      if (loading) {
  
        setHeatmapData(res?.movements)
  
        //console.log("🚀 ~ useEffect ~ res?.movements:", res?.movements)
  
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
  
        //console.log("🚀 ~ points ~ points:", points)
        // Veriyi ayarla
        heatmapInstance.setData({
          max: 5,
          data: points,
        });
      });
    }, [heatmapData]);



    return (
        <div className='w-full flex flex-col items-start mb-10'>
            <div className='w-full flex flex-row items-center justify-between relative'>
                <div className="text-primary font-dosis text-3xl px-2 font-medium mb-3 ">
                    Mouse Movements
                    <hr className="border-b-2 border-primary w-[38px]" />
                </div>



            </div>
            <div className="w-full flex items-center rounded-md shadow-xl border border-stone-900/20 bg-main py-4 px-4">
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

                            {/* <img src="/test.png" alt="" className='w-full h-full' /> */}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default MouseMovements