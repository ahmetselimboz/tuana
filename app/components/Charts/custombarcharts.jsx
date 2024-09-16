/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CustomBarCharts = ({ selectedDate, setSelectedDate, selectedDropdown, setSelectedDropdown, barData, height, barHeight }) => {
    
    const bars = barData?.sort((a, b) => b.visitor - a.visitor).map(item => item.visitor)|| []

    const date = selectedDate;
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;



    // options ve series'i ayır
    const [options] = useState({
        chart: {
            type: 'bar',
            toolbar: {
                show: false  
            }
        },
        plotOptions: {
            bar: {
                barHeight: `${barHeight}`,
                distributed: true,
                horizontal: true,
                borderRadius: 3,
                dataLabels: {
                    position: 'bottom'
                },
            }
        },
        colors: ['#19ae9d53'],
        dataLabels: {
            enabled: false,
            textAnchor: 'start',
            style: {
                fontFamily: 'Dosis, sans-serif',  
                colors: ['#14897c'],
              },
            formatter: function (val, opt) {
                return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
            },
            offsetX: 0,
           
        },
        stroke: {
            width: 1,
            colors: ['#14897c']
        },
        xaxis: {
           
            axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false, 
              },
        },
        yaxis: {
            labels: {
                show: false
            }
        },

        legend: {
            show: false,  
          },
        tooltip: {
            theme: 'light',
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function (val) {
                        return '';
                    }
                },
                formatter: function (val) {
                    return val + " visitors";  
                }
            }
        }
    });

    const [series] = useState([{
        data: bars
    }]);

    return (
        <div className="line-chart w-full h-auto">
           
            <Chart options={options} series={series} type="bar"  height={height}/>
        </div>
    );
};

export default CustomBarCharts;
