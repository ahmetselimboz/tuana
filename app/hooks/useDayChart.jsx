import { useEffect, useState } from 'react';
import { convertToLocal, convertToUTC, mergeData } from '../components/convertToUTC';
import { useAppSelector } from '@/lib/redux/hooks';

const useDayChart = () => {

    const selectedDate = convertToLocal(useAppSelector((state) => state.dateSettings.lastDate))
    const [loading, setLoading] = useState(true)
    const formattedDate = selectedDate
        ? `${new Date(selectedDate).getUTCFullYear()}-${(new Date(selectedDate).getUTCMonth() + 1).toString().padStart(2, '0')}-${new Date(selectedDate).getUTCDate().toString().padStart(2, '0')}`
        : "0000-00-00";

    const days = [`${formattedDate}T00:00:00.000Z`, `${formattedDate}T23:59:59.999Z`]


    const [categories, setCategories] = useState([])
    const [seriesData, setSeriesData] = useState([])

    const sendData = async ({ data }) => {
        try {
            console.log("data: ", data)
            if (data && data?.value.length > 0) {


                const timeSeriesData = data?.value?.map(visitor => {
                    const visitTime = new Date(visitor.date);
                    return {
                        time: visitTime,
                        value: visitor.new ? 1 : 0
                    };
                });

                const groupedData = timeSeriesData?.reduce((acc, curr) => {
                    const visitTime = new Date(curr.time);
                    const hour = visitTime.getHours();
                    acc[hour] = (acc[hour] || 0) + (curr.value || 1);
                    return acc;
                }, {});

                if (groupedData) {


                    let categories = Object.keys(groupedData).map(hour => {
                        const date = new Date();
                        date.setHours(parseInt(hour), 0, 0);
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

                    const filteredDays = days.filter(day => {
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
                    setCategories(combined);
                    setSeriesData(Object.values(seriesDataa));
                } else {
                    console.log("No data to process or groupedData is undefined.");
                }
                setLoading(true)
            } else {
                const hour = [0, 0]
                setCategories(days)
                setSeriesData(hour)
                setLoading(true)

            }
        } catch (error) {
            console.error("Error in sendData:", error);
            setLoading(true);
        }
    }

    return { loading, categories, seriesData, sendData };
};

export default useDayChart;
