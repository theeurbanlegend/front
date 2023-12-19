import React from 'react';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';

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

  return <Line
  data={chartData}
  plugins={[zoomPlugin]}
  options={{
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        },
        pan: {
          enabled: true,
          mode: 'xy',
        },
      },
      
    },
  }}
/>
};

export default PulseChart


