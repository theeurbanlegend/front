import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS} from 'chart.js/auto'

const PulseChart = ({ data,dataKey, label, color }) => {
  const chartData = {
    labels: data.map((entry) => {
      const createdAt = new Date(entry.createdAt);
      return createdAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    }),
    datasets: [
      {
        label: label,
        data: data.map((entry) => entry[dataKey]),
        fill: false,
        borderColor: color,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default PulseChart


