"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/lib/redux/hooks";
import Loading from "@/app/loading";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const convertToTimezoneHourISO = (date, timezone) => {
    const visitTime = new Date(date);
    const options = { hour12: false, timeZone: timezone };
    const formattedHour = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        ...options,
    }).format(visitTime);

    visitTime.setUTCHours(parseInt(formattedHour), 0, 0, 0);
    visitTime.setUTCMinutes(0, 0, 0);
    return visitTime.toISOString(); // ISO formatında döndür
};

const generateHourlyCategories = (date) => {
    const categories = [];
    const baseDate = new Date(date);
    baseDate.setUTCHours(0, 0, 0, 0); // Tarihi başlangıç saati 00:00:00.000Z yap

    for (let hour = 0; hour < 24; hour++) {
        const newDate = new Date(baseDate);
        newDate.setUTCHours(hour); // Saatleri sırayla ekle
        categories.push(newDate.toISOString()); // ISO 8601 formatında ekle
    }

    return categories;
};

const generateRangeCategories = (firstDate, lastDate) => {
    const categories = [];
    const startDate = new Date(firstDate);
    const endDate = new Date(lastDate);

    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(0, 0, 0, 0);

    while (startDate <= endDate) {
        categories.push(new Date(startDate).toISOString()); // Günlük kategoriler
        startDate.setUTCDate(startDate.getUTCDate() + 1); // 1 gün ileriye git
    }

    return categories;
};

const mergeHourlyData = (data, categories, timezone) => {
    const groupedData = data.reduce((acc, curr) => {
        const hourISO = convertToTimezoneHourISO(curr.date, timezone); // ISO formatına çevir
        acc[hourISO] = (acc[hourISO] || 0) + 1;
        return acc;
    }, {});

    // Kategorilere göre sıralayıp, eksiklere sıfır ekle
    return categories.map((category) => groupedData[category] || 0);
};

const mergeRangeData = (data, categories) => {
    const groupedData = data.reduce((acc, curr) => {
        const dateISO = new Date(curr.date).toISOString().split("T")[0]; // Tarihi günlük gruplar
        acc[dateISO] = (acc[dateISO] || 0) + 1;
        return acc;
    }, {});

    // Kategorilere göre sıralayıp, eksiklere sıfır ekle
    return categories.map((category) => {
        const dayISO = category.split("T")[0];
        return groupedData[dayISO] || 0;
    });
};

const roundUpToNext25 = (number) => Math.ceil(number / 25) * 25;

const LineChart = ({ data }) => {
    const selectedDate = useAppSelector((state) => state.dateSettings.lastDate);
    const firstDate = useAppSelector((state) => state.dateSettings.firstDate);
    const range = useAppSelector((state) => state.dateSettings.range);
    const timezone = useAppSelector((state) => state.dateSettings.timezone);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [seriesData, setSeriesData] = useState([]);

    const defaultCategories = generateHourlyCategories(selectedDate);

    const [chartData, setChartData] = useState({
        series: [{ name: "Data", data: [0, 0], color: "#19ae9d" }],
        options: {
            chart: { type: "area", height: 350, zoom: { enabled: false }, toolbar: { show: false } },
            stroke: { curve: "smooth" },
            xaxis: { type: "datetime", categories: defaultCategories, labels: { datetimeUTC: true, format: "HH:mm" } },
            yaxis: { min: 0, max: 100 },
            tooltip: { x: { format: "dd/MM/yy HH:mm" } },
            grid: { borderColor: "#19ae9d", strokeDashArray: 3 },
            markers: { size: 3 },
            dataLabels: { enabled: false },
            fill: { colors: ["#19ae9d"] },
        },
    });

    const processData = async (data) => {
        //console.log("🚀 ~ processData ~ data:", data);
        try {
            if (!data || !data.value || data.value.length === 0) {
                if (range && firstDate) {
                    const rangeCategories = generateRangeCategories(firstDate, selectedDate);
                    setCategories(rangeCategories);
                    setSeriesData(new Array(rangeCategories.length).fill(0));
                } else {
                    setCategories(defaultCategories);
                    setSeriesData(new Array(defaultCategories.length).fill(0));
                }
                setLoading(false);
                return;
            }

            if (range && firstDate) {
                const rangeCategories = generateRangeCategories(firstDate, selectedDate);
                const updatedSeriesData = mergeRangeData(data.value, rangeCategories);

                setCategories(rangeCategories);
                setSeriesData(updatedSeriesData);
            } else {
                const updatedCategories = generateHourlyCategories(selectedDate);
                const updatedSeriesData = mergeHourlyData(data.value, updatedCategories, timezone);

                setCategories(updatedCategories);
                setSeriesData(updatedSeriesData);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error in processData:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (data) {
            setLoading(true);
            setCategories([]);
            setSeriesData([]);
            processData(data);
        }
    }, [data]);

    useEffect(() => {
        const maxVal = Math.max(...seriesData);
       // console.log("🚀 ~ useEffect ~ seriesData:", seriesData);
        //console.log("🚀 ~ useEffect ~ categories:", categories);
        setChartData((prevData) => ({
            ...prevData,
            series: [{ ...prevData.series[0], name: data?.label, data: seriesData }],
            options: {
                ...prevData.options,
                xaxis: { ...prevData.options.xaxis, categories },
                yaxis: { ...prevData.options.yaxis, max: roundUpToNext25(maxVal) },
            },
        }));
    }, [categories, seriesData]);

    if (loading) return <Loading />;

    return (
        <div className="line-chart">
            <Chart options={chartData.options} series={chartData.series} type="area" height={350} />
        </div>
    );
};

export default LineChart;
