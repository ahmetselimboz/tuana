/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

"use client"
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { useAppSelector } from "@/lib/redux/hooks";
import { convertToUTC, createHourlyVisitorsArray, mergeData } from "../convertToUTC";
import useDayChart from "@/app/hooks/useDayChart";
import Loading from "@/app/loading";
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const LineChart = ({ data }) => {

    const { loading, categories, seriesData, sendData } = useDayChart(data)

    const handleRequest = async () => {
        await sendData({ data });
    };

    useEffect(() => {
        if (data) {
            //console.log("🚀 ~ useEffect ~ data:", data)
            handleRequest();
            
        }
    }, [data])

    const [chartData, setChartData] = useState({
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

            },
            yaxis: {
                min: 0,
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
        console.log("🚀 ~ LineChart ~ seriesData:", seriesData);
        console.log("🚀 ~ LineChart ~ categories:", categories);
        console.log("🚀 ~ chartData before update:", chartData);
        setChartData({
            ...chartData,
            series: [{
                name: "Visits",
                data: [0, 0],
                color: "#19ae9d"
            }],
            options: {
                ...chartData.options,
                xaxis: {
                    ...chartData.options.xaxis,
                    categories: ["2024-10-01T00:00:00.000Z", "2024-10-01T23:59:59.999Z"]
                },
                yaxis: {
                    ...chartData.options.yaxis,
                    max: 100,
                },
            }
        });
    }, [categories, seriesData]);
    

    if (!loading) {
        return <Loading></Loading>
    }

    return (
        <div className="line-chart">
            <Chart options={chartData.options} series={chartData.series} type="area" height={350} />
        </div>
    );
};

export default LineChart;
