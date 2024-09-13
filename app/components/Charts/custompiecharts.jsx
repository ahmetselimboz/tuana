/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Popup from "../popup";

const PieChart = ({ selectedDate, setSelectedDate, selectedDropdown, setSelectedDropdown }) => {

    // const date = selectedDate
    // const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedData, setSelectedData] = useState({ label: "", value: 0 });


    const [chartData] = useState({
        series: [44, 55, 41, 17, 15],
        options: {
            chart: {
                type: 'donut',
                events: {
                    dataPointSelection: (event, chartContext, config) => {
                        const dataPointIndex = config.dataPointIndex;
                        const label = config.w.config.labels[dataPointIndex];
                        const value = config.w.config.series[dataPointIndex];

                        setSelectedData({ label, value });
                        setIsPopupOpen(true);
                    }
                }
            },
            series: [44, 55, 41, 17, 15], 
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,

                            value: {
                                show: true,
                                fontSize: '20px',
                                fontFamily: 'Dosis, sans-serif',
                                fontWeight: 400,
                                color: '#666',
                                offsetY: 16,
                                formatter: function (val) {
                                    return val; 
                                }
                            },
                            total: {
                                show: true,
                                showAlways: true,
                                label: 'Total Visits',
                                fontSize: '22px',
                                fontFamily: 'Dosis, sans-serif',
                                fontWeight: 600,
                                color: '#373d3f',
                                formatter: function (w) {
                                    return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                }
                            }
                        }
                    }
                }
            },
            labels: ['Chrome', 'Safari', 'Firefox', 'Microsoft Edge', 'Yandex'], // Dilim isimleri
            responsive: [
                {
                    breakpoint: 2000,
                    options: {
                        chart: {
                       
                            height:300
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                },
              
            ]
        },

    });

    const closePopup = () => setIsPopupOpen(false);

    return (
        <div className="line-chart w-full h-full text-xl relative">
            <Chart options={chartData.options} series={chartData.series} type="donut" height={280}/>
            {isPopupOpen && (
                <Popup isOpen={isPopupOpen} selectedData={selectedData} closePopup={closePopup}></Popup>
            )}
        </div>
    );
};

export default PieChart;
