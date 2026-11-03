import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BalanceChartProps {
  history: number[];
}

const BalanceChart: React.FC<BalanceChartProps> = ({ history }) => {
  const data = {
    labels: history.map((_, index) => (index === 0 ? 'Awal' : `Spin ${index}`)),
    datasets: [
      {
        label: 'Saldo Virtual (Rp)',
        data: history,
        borderColor: '#f87171',
        backgroundColor: 'rgba(248, 113, 113, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#9ca3af' },
      },
      title: {
        display: true,
        text: 'Grafik Pergerakan Saldo (Simulasi Real-Time)',
        color: '#f3f4f6',
        font: { size: 16, weight: 'bold' as const },
      },
    },
    scales: {
      x: { ticks: { color: '#9ca3af' }, grid: { color: '#374151' } },
      y: { ticks: { color: '#9ca3af' }, grid: { color: '#374151' }, beginAtZero: true },
    },
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8 p-4 bg-slate-800 border border-slate-700 rounded-2xl shadow-xl h-80">
      <Line options={options} data={data} />
    </div>
  );
};

export default BalanceChart;