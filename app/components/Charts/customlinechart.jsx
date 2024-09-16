/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
"use client"
import React, { useEffect, useState } from "react";
// import Chart from "react-apexcharts";
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const LineChart = ({ selectedDate, setSelectedDate, selectedDropdown, setSelectedDropdown }) => {

    const formattedDate = selectedDate
        ? `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`
        : "0000-00-00"; // Eğer `selectedDate` yoksa bir varsayılan tarih



    const [chartData] = useState({
        series: [
            {
                name: "Value",
                data: [400, 380, 500, 650, 820, 100, 250], // Grafikteki değerler
                color: "#19ae9d"
            },

        ],

        options: {
            chart: {
                type: "area",
                height: 350,
                zoom: {
                    enabled: false,
                },
            },
            stroke: {
                curve: "smooth", // Eğri görünümü
            },
            xaxis: {
                type: 'datetime',
                categories: [`${formattedDate}T00:00:00.000Z`, `${formattedDate}T03:00:00.000Z`, `${formattedDate}T06:00:00.000Z`, `${formattedDate}T09:00:00.000Z`, `${formattedDate}T12:00:00.000Z`, `${formattedDate}T15:00:00.000Z`, `${formattedDate}T18:00:00.000Z`, `${formattedDate}T21:00:00.000Z`, `${formattedDate}T23:59:00.000Z`]
            },
            yaxis: {
                min: 0,
                max: 1000,
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


    return (
        <div className="line-chart">
            <Chart options={chartData.options} series={chartData.series} type="area" height={350} />
        </div>
    );
};

export default LineChart;
