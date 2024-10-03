/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ColumnsCharts = ({data}) => {
console.log("🚀 ~ ColumnsCharts ~ data:", data)

   


    const [chartData, setChartData] = useState({
        series: [{
            name: 'Visitors',
            data: [1]

        }],

        options: {
            chart: {
                height: 350,
                type: 'bar',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false  
                }
            },
        
            plotOptions: {
                bar: {
                    borderRadius: 5,
                    columnWidth: '50px',
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 0
            },
            grid: {
                row: {
                    colors: ['#EEF0F3', '#e5e7eb']
                }
            },
            xaxis: {
                labels: {
                    rotate: -45
                },
                categories:['tr-TR'],
                
                tickPlacement: 'on'
            },

            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: "horizontal",
                    shadeIntensity: 0.25,
                    gradientToColors: undefined,
                    inverseColors: true,
                    opacityFrom: 0.85,
                    opacityTo: 0.85,
                    stops: [50, 0, 100]
                },
            }
        },
    });

    // useEffect(()=>{
    //     setChartData((prevData) => ({
    //         ...prevData,
    //         series: [{
    //             ...prevData.series[0],
    //             data: data?.visitor
    //         }],
    //         options: {
    //             ...prevData.options,
    //             xaxis: {
    //                 ...prevData.options.xaxis,
    //                 categories: data?.languages
    //             },

    //         }
    //     }));
    // },[data])


    return (
        <div className="line-chart">
            <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
        </div>
    );
};

export default ColumnsCharts;
