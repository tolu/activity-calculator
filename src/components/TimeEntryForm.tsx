import React, { useState } from 'react';
import { addEntry, DefaultEffort, Effort } from '../store/timeEntries';
import { format, setDefaultOptions } from 'date-fns';
import { nb } from 'date-fns/locale';

// Default to Norwegian locale
setDefaultOptions({ locale: nb });

export default function TimeEntryForm() {
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [effort, setEffort] = useState<Effort>(DefaultEffort);
  const [startTime, setStartTime] = useState(format(new Date(), 'HH:mm'));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = crypto.randomUUID();
    const today = new Date();
    const [hours, minutes] = startTime.split(':').map(Number);
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      hours,
      minutes
    ).toISOString();

    await addEntry({
      id,
      date,
      startTime,
      description,
      duration,
      effort,
    });

    setDescription('');
    setDuration(0);
    setEffort(DefaultEffort);
    setStartTime(format(new Date(), 'HH:mm'));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Aktivitet
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 font-normal"
            required
          />
        </label>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tid
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
              required
            />
          </label>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tidsbruk: {duration} min
            <input
              type="range"
              min="0"
              max="60"
              step="15"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="mt-1 block w-full"
            />
          </label>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Energiforbruk
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setEffort('lett')}
              className={`px-3 py-1 text-sm rounded ${
                effort === 'lett'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Lett
            </button>
            <button
              type="button"
              onClick={() => setEffort('middels')}
              className={`px-3 py-1 text-sm rounded ${
                effort === 'middels'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Middels
            </button>
            <button
              type="button"
              onClick={() => setEffort('tung')}
              className={`px-3 py-1 text-sm rounded ${
                effort === 'tung'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tung
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
      >
        Legg til
      </button>
    </form>
  );
}
