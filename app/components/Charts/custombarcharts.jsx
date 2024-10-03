import React, { useMemo } from "react";
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CustomBarCharts = ({ barData, height= 400, barHeight }) => {
    const bars = useMemo(() => {
            // console.log("🚀 ~ CustomBarCharts ~ height:", height)
            // console.log("🚀 ~ CustomBarCharts ~ barData:", barData)
        return barData?.sort((a, b) => b.visitor - a.visitor).map(item => item.visitor) || [];
    }, [barData]);
    
    const options = useMemo(() => ({
        chart: {
            type: 'bar',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                barHeight: typeof barHeight === 'string' ? barHeight : `${barHeight}px`,
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
                return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
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
                    formatter: function () {
                        return '';
                    }
                },
                formatter: function (val) {
                    return val + " visitors";
                }
            }
        }
    }), [barHeight]);

    const series = useMemo(() => [{
        data: bars
    }], [bars]);

    // console.log("🚀 ~ CustomBarCharts ~ barData:", barData);
    // console.log("🚀 ~ CustomBarCharts ~ bars:", bars);
    // console.log("🚀 ~ CustomBarCharts ~ series:", series);

    return (
        <div className="line-chart w-full " style={{ height }}>
            <Chart options={options} series={series} type="bar" height={height} />
        </div>
    );
};

export default React.memo(CustomBarCharts);
