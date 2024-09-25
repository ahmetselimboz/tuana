/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

"use client"
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { useAppSelector } from "@/lib/redux/hooks";
import {convertToUTC, createHourlyVisitorsArray, mergeData} from "../convertToUTC";
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const LineChart = ({ data }) => {

   

    const selectedDate = new Date(useAppSelector((state) => state.dateSettings.lastDate))

    const data2 = {
        "0": 0,
        "3": 0,
        "6": 0,
        "9": 0,
        "12": 0,
        "15": 0,
        "18": 0,
        "21": 0
      };

    const formattedDate = selectedDate
        ? `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`
        : "0000-00-00"; 

    const days = [`${formattedDate}T00:00:00.000Z`, `${formattedDate}T03:00:00.000Z`, `${formattedDate}T06:00:00.000Z`, `${formattedDate}T09:00:00.000Z`, `${formattedDate}T12:00:00.000Z`, `${formattedDate}T15:00:00.000Z`, `${formattedDate}T18:00:00.000Z`, `${formattedDate}T21:00:00.000Z`, `${formattedDate}T23:59:00.000Z`]

    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                type: "area",
                height: 350,
                zoom: {
                    enabled: false,
                },
            },
            stroke: {
                curve: "smooth", 
            },
            xaxis: {
                type: 'datetime',
                categories: []
            },
            yaxis: {
                min: 0,
                max: data?.value?.length < 100 ? 100 : 1000, 
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
            grid: {
                borderColor: "#19ae9d",
                strokeDashArray: 3,
            },
            markers: {
                size: 3,
            },
            dataLabels: {
                enabled: false,
            },
            fill: {
                colors: ['#19ae9d']
            }
        },
    });

    useEffect(() => {
        
 
        const timeSeriesData = data?.value?.map(visitor => {
            const visitTime = new Date(visitor.date);
            return {
                time: visitTime,
                value: visitor.new ? 1 : 0 
            };
        });

        const groupedData = timeSeriesData?.reduce((acc, curr) => {
            const visitTime =  new Date(curr.time);
            const hour = visitTime.getHours();
            acc[hour] = (acc[hour] || 0) + (curr.value || 1);
            return acc;
        }, {});
        
        let categories = null
        if (groupedData && Object.keys(groupedData).length > 0) {
            categories = Object.keys(groupedData).map(hour => {
                const date = new Date();
                date.setHours(parseInt(hour), 0, 0); 
                return convertToUTC(date); 
            });  
        } else {
            console.log("No data to process or groupedData is undefined.");
        }

        let seriesData =null
        if (groupedData && Object.values(groupedData).length > 0) {
            seriesData = mergeData(groupedData, data2); 
            seriesData= Object.values(seriesData)
        } else {
            console.log("No data to process or groupedData is undefined.");
        }

        let combined = null

        if (groupedData && Object.values(groupedData).length > 0) {
            combined = [...Object.values(categories), ...days].sort((a, b) => {
                return new Date(a) - new Date(b)
            })
        } else {
            console.log("No data to process or groupedData is undefined.");
        }

        setChartData({
            ...chartData,
            series: [{
                name: "Visits",
                data: seriesData, 
                color: "#19ae9d"
            }],
            options: {
                ...chartData.options,
                xaxis: {
                    ...chartData.options.xaxis,
                    categories: combined
                }
            }
        });
    }, [data]);

    return (
        <div className="line-chart">
            <Chart options={chartData.options} series={chartData.series} type="area" height={350} />
        </div>
    );
};

export default LineChart;
