"use client"
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { useAppSelector } from '@/lib/redux/hooks';
import Loading from "@/app/loading";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


const convertToUTC = (date) => {
    return new Date(Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    )).toISOString();
};


const generateHourlyCategories = (dateString) => {
    const date = new Date(dateString);
    const categories = [];
    for (let hour = 0; hour < 24; hour++) {
        const newDate = new Date(date);
        newDate.setUTCHours(hour, 0, 0, 0);
        categories.push(newDate.toISOString());
    }
    return categories;
};


const mergeData = (groupedData, hours) => {
    const merged = { ...hours };
    Object.keys(groupedData).forEach(hour => {
        merged[hour] = groupedData[hour];
    });
    return merged;
};

const LineChart = ({ data }) => {
    const selectedDate = useAppSelector((state) => state.dateSettings.lastDate);
    const firstDate = useAppSelector((state) => state.dateSettings.firstDate);
    const range = useAppSelector((state) => state.dateSettings.range);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [seriesData, setSeriesData] = useState([]);


    const formattedDate = selectedDate
        ? `${new Date(selectedDate).getUTCFullYear()}-${(new Date(selectedDate).getUTCMonth() + 1).toString().padStart(2, '0')}-${new Date(selectedDate).getUTCDate().toString().padStart(2, '0')}`
        : "0000-00-00";


    const hasDateRange = data && data.status !== undefined;

    const defaultCategories = generateHourlyCategories(selectedDate);


    const [chartData, setChartData] = useState({
        series: [{
            name: "Data",
            data: [0, 0],
            color: "#19ae9d"
        }],
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
                categories: hasDateRange ? [] : defaultCategories,
                labels: {
                    datetimeUTC: true,
                    format: 'HH:mm'
                }
            },
            yaxis: {
                min: 0,
                max: 100,
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm',
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
                colors: ['#19ae9d'],
            },
        },
    });

    // Veri gönderimi ve işleme
    const sendData = async ({ data, tz }) => {
        try {
            // console.log("🚀 ~ sendData ~ data:", data)


            if (data && data?.value?.length > 0) {

                if (data?.status) {
                    // Özel tarih durumunda
                    const dateString = "2024-10-02T18:06:49.254Z";
                    const date = new Date(dateString);
                    const sevenDaysBefore = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);

                    const formattedDatesevenDaysBefore = sevenDaysBefore
                        ? `${new Date(sevenDaysBefore).getUTCFullYear()}-${(new Date(sevenDaysBefore).getUTCMonth() + 1).toString().padStart(2, '0')}-${new Date(sevenDaysBefore).getUTCDate().toString().padStart(2, '0')}`
                        : "0000-00-00";

                    setCategories([formattedDatesevenDaysBefore, `${formattedDate}T00:00:00.000Z`]);
                    setSeriesData([0, Number(data?.value)]);
                } else {

                    const timeSeriesData = data?.value?.map(visitor => {
                        const visitTime = new Date(visitor.date);
                        return {
                            time: visitTime,
                            value: visitor.new ? 1 : 0
                        };
                    });


                    const groupedData = timeSeriesData?.reduce((acc, curr) => {
                        const visitTime = new Date(curr.time);
                        // const hour = visitTime.getUTCHours();

                        const timezone = tz; // İstediğin timezone
                        const options = { hour: '2-digit', hour12: false }; // 24 saat formatı
                        const hour = new Intl.DateTimeFormat('en-US', { ...options, timeZone: timezone }).format(visitTime);

                        acc[hour] = (acc[hour] || 0) + (curr.value || 1);
                        return acc;
                    }, {});

                    if (groupedData) {
                        let categories = Object.keys(groupedData).map(hour => {
                            const date = new Date();
                            date.setUTCHours(parseInt(hour), 0, 0);
                            return convertToUTC(date);
                        });

                        const removeMilliseconds = (dateString) => {
                            const date = new Date(dateString);
                            return new Date(
                                date.getUTCFullYear(),
                                date.getUTCMonth(),
                                date.getUTCDate(),
                                date.getUTCHours(),
                                date.getUTCMinutes(),
                                date.getUTCSeconds()
                            ).getTime();
                        };

                        const filteredDays = defaultCategories.filter(day => {
                            const dayTime = removeMilliseconds(day);
                            return !categories.some(category => removeMilliseconds(category) === dayTime);
                        });

                        const combined = [...categories, ...filteredDays].sort((a, b) => new Date(a) - new Date(b));
                        const hours = combined.reduce((acc, timestamp) => {
                            const date = new Date(timestamp);
                            const hour = date.getUTCHours();
                            acc[hour] = 0;
                            return acc;
                        }, {});

                        const seriesDataa = mergeData(groupedData, hours);
                        if (!range) {
                            setCategories(combined?.length > 24 ? combined.slice(0, 24) : combined);
                            setSeriesData(Object.values(seriesDataa));
                        } else {
                            console.log("🚀 ~ sendData ~ combined:", combined)
                            console.log("🚀 ~ sendData ~ seriesDataa:", seriesDataa)
                            setCategories(combined);
                            setSeriesData(Object.values(seriesDataa));
                        }

                    }
                }
            } else {
                if (!range) {
                    setCategories(defaultCategories?.length > 24 ? defaultCategories.slice(0, 24) : defaultCategories);
                    setSeriesData(new Array(24).fill(0));
                } else {
                    setCategories([firstDate, selectedDate]);
                    setSeriesData([0,0]);
                }

            }
            setLoading(false);
        } catch (error) {
            console.error("Error in sendData:", error);
            setLoading(false);
        }

    };

    useEffect(() => {
        if (data) {
            setLoading(true);
            setCategories([]);
            setSeriesData([]);
            sendData({ data });
        }
    }, [data]);

    useEffect(() => {
        setChartData((prevData) => ({
            ...prevData,
            series: [{
                ...prevData.series[0],
                name: data?.label,
                data: seriesData
            }],
            options: {
                ...prevData.options,
                xaxis: {
                    ...prevData.options.xaxis,
                    categories: categories, // Kategorilerde UTC kullan
                },
                yaxis: {
                    ...prevData.options.yaxis,
                    max: 100,
                }
            }
        }));
        //console.log("🚀 ~ LineChart ~ seriesData:", seriesData)
        // console.log("🚀 ~ LineChart ~ categories:", categories)
    }, [categories, seriesData]);



    if (loading) {
        return <Loading />;
    }

    return (
        <div className="line-chart">
            <Chart options={chartData.options} series={chartData.series} type="area" height={350} />
        </div>
    );
};

export default LineChart;
