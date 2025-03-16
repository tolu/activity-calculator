import { useStore } from '@nanostores/react';
import { timeEntries, type TimeEntry } from '../store/timeEntries';
import { format, subDays } from 'date-fns';

export default function Calendar() {
  const entries = useStore(timeEntries);
  const today = new Date();
  const days = [3, 2, 1, 0].map((d) => subDays(today, d));

  const getEntriesForDate = (date: Date): TimeEntry[] => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return Object.values(entries)
      .filter((entry) => entry.date.startsWith(dateStr))
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  return (
    <div className="grid grid-cols-4 gap-4 mt-8">
      {days.map((date) => (
        <div
          key={date.toISOString()}
          className="bg-white p-4 rounded-lg shadow"
        >
          <h3 className="font-bold mb-2">{format(date, 'MMM d')}</h3>
          {getEntriesForDate(date).map((entry) => (
            <div key={entry.id} className="text-sm mb-2 p-2 bg-gray-50 rounded">
              <div className="font-medium">{entry.description}</div>
              <div className="text-gray-600">
                {entry.startTime} • {entry.duration} min • Energi:{' '}
                {entry.effort}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
