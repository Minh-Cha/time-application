// src/components/LineGraph.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { ChartData } from 'chart.js';
import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
interface LineGraphProps {
    data: ChartData<"line", (number | null)[], string>;
}

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Your Chart Title',
            },
        },
    };

    // Ensure that data is not null or undefined before rendering Line
    if (!data) {
        return <p>No data available</p>;
    }

    return <Line options={options} data={data} />;
};

export default LineGraph;
