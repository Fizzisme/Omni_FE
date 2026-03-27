'use client';

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

type Props = {
    high: number;
    medium: number;
    low: number;
};

export default function RiskPieChart({ high, medium, low }: Props) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const chart = echarts.init(chartRef.current);

        const total = high + medium + low;

        chart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)',
            },

            series: [
                {
                    name: 'Risk',
                    type: 'pie',
                    radius: ['55%', '75%'], // 👈 donut
                    center: ['50%', '50%'],
                    avoidLabelOverlap: false,

                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 4,
                    },

                    label: {
                        show: true,
                        formatter: '{b}\n{d}%',
                        fontSize: 12,
                    },

                    labelLine: {
                        smooth: true,
                        length: 10,
                        length2: 8,
                    },

                    data: [
                        {
                            value: high,
                            name: 'High',
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                                    { offset: 0, color: '#f87171' },
                                    { offset: 1, color: '#ef4444' },
                                ]),
                            },
                        },
                        {
                            value: medium,
                            name: 'Medium',
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                                    { offset: 0, color: '#fde68a' },
                                    { offset: 1, color: '#facc15' },
                                ]),
                            },
                        },
                        {
                            value: low,
                            name: 'Low',
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                                    { offset: 0, color: '#86efac' },
                                    { offset: 1, color: '#22c55e' },
                                ]),
                            },
                        },
                    ],

                    emphasis: {
                        scale: true,
                        scaleSize: 10,
                    },
                },
            ],

            // 👇 TEXT Ở GIỮA
            graphic: [
                {
                    type: 'text',
                    left: 'center',
                    top: '45%',
                    style: {
                        text: total.toString(),
                        textAlign: 'center',
                        fontSize: 26,
                        fontWeight: 'bold',
                    },
                },
                {
                    type: 'text',
                    left: 'center',
                    top: '55%',
                    style: {
                        text: 'Total Orders',
                        textAlign: 'center',
                        fontSize: 12,
                        fill: '#888',
                    },
                },
            ],
        });

        const handleResize = () => chart.resize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.dispose();
        };
    }, [high, medium, low]);

    return (
        <div className="bg-white p-6 rounded-2xl border mt-6 shadow-sm">
            <h2 className="mb-4 font-semibold text-[#1c1a17]">
                Risk Distribution
            </h2>

            <div ref={chartRef} className="w-full h-[350px]" />
        </div>
    );
}