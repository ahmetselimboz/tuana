/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ColumnsCharts = ({ selectedDate, setSelectedDate, selectedDropdown, setSelectedDropdown }) => {

    const date = selectedDate
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;




    const [chartData] = useState({
        series: [{
            name: 'Visitors',
            data: [44, 55, 41, 67, 22]
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
                    columnWidth: '50%',
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
                categories: ['en-US', 'en-GB', 'de-DE', 'tr-TR', 'fr-FR'],
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


    return (
        <div className="line-chart">
            <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
        </div>
    );
};

export default ColumnsCharts;
