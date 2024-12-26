"use client"
import { useAxios } from '@/app/hooks/useAxios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import h337 from 'heatmap.js';
import { useAppSelector } from '@/lib/redux/hooks';

const UserInteractions = () => {
    const date = useAppSelector((state) => state.dateSettings)

    const params = useSearchParams()
    const appId = params.get("id")

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
           
            console.log("🚀 ~ useEffect ~ ressssss:", res)
            const points = [];
            res?.movements.movements.forEach((movement) => {
                movement.coord.forEach((coord) => {
                  coord.values.forEach((value) => {
                    points.push({
                      x: value.x,
                      y: value.y,
                      value: 1, // Isı haritası yoğunluğu
                    });
                  });
                });
              });
        
              // Heatmap.js ile harita oluşturma
              const heatmapInstance = h337.create({
                container: document.querySelector('#heatmapContainer'),
                radius: 50, // Noktaların büyüklüğü
              });
        
              heatmapInstance.setData({ max: 10, data: points }); // Veri ekleme


        }
    }, [res, loading])
            


    return (
        <div id="heatmapContainer" style={{ width: '100%', height: '100%', position: 'relative' }}></div>
    )
}

export default UserInteractions