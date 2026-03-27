'use client';

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default function RevenueChart({ data }: { data: any[] }) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const chart = echarts.init(chartRef.current);

        const days = data.map((d) => d.day);
        const revenues = data.map((d) => d.revenue);

        chart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
                formatter: (params: any) => {
                    const p = params[0];
                    return `Day ${p.name}<br/> $${p.value.toFixed(2)}`;
                },
            },

            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                containLabel: true,
            },

            xAxis: {
                type: 'category',
                data: days,
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    color: '#888',
                },
            },

            yAxis: {
                type: 'value',
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#eee',
                    },
                },
                axisLabel: {
                    formatter: '${value}',
                    color: '#888',
                },
            },

            series: [
                {
                    name: 'Revenue',
                    type: 'bar',
                    data: revenues,
                    barWidth: 22,

                    itemStyle: {
                        borderRadius: [10, 10, 0, 0],

                        // 🔥 gradient cam đẹp hơn
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#fb923c' },
                            { offset: 1, color: '#f97316' },
                        ]),

                        shadowBlur: 10,
                        shadowColor: 'rgba(249,115,22,0.3)',
                    },

                    emphasis: {
                        itemStyle: {
                            shadowBlur: 20,
                            shadowColor: 'rgba(249,115,22,0.5)',
                        },
                    },
                },
            ],

            animationDuration: 800,
        });

        const handleResize = () => chart.resize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.dispose();
        };
    }, [data]);

    return (
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">
                    Revenue This Month
                </h2>
                <span className="text-sm text-gray-400">
                    Daily
                </span>
            </div>

            <div ref={chartRef} className="w-full h-[320px]" />
        </div>
    );
}