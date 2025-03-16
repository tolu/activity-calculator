import { useStore } from '@nanostores/react';
import { Effort, timeEntries } from '../store/timeEntries';
import { Line } from 'react-chartjs-2';
import { subDays, format } from 'date-fns';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Score per 30 minutes
 */
const effortScores: Record<Effort, number> = {
  avslappende: -1,
  lett: 1,
  middels: 2,
  tung: 3,
};

export default function EffortGraph() {
  const entries = useStore(timeEntries);
  const today = new Date();
  const days = Array.from({ length: 14 }, (_, i) => subDays(today, 13 - i));

  const data = {
    labels: days.map((date) => format(date, 'MMM d')),
    datasets: [
      {
        label: 'Daily Effort',
        data: days.map((date) => {
          const dateStr = format(date, 'yyyy-MM-dd');
          return Object.values(entries)
            .filter((entry) => entry.date.startsWith(dateStr))
            .reduce((sum, entry) => sum + effortScores[entry.effort], 0);
        }),
        borderColor: 'rgb(99, 102, 241)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Daglig aktivitetsnivå (siste 14 dager)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-8">
      <Line data={data} options={options} />
    </div>
  );
}
