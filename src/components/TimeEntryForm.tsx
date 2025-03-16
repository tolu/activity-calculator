import React, { useState } from "react";
import { addEntry, DefaultEffort, Effort } from "../store/timeEntries";
import { format, setDefaultOptions } from "date-fns";
import { nb } from "date-fns/locale";

// Default to Norwegian locale
setDefaultOptions({ locale: nb });

const effortButtonMap = new Map<Effort, { label: string; variant: string }>([
  ["avslappende", { label: "Avslappende", variant: "success" }],
  ["lett", { label: "Lett", variant: "neutral" }],
  ["middels", { label: "Middels", variant: "brand" }],
  ["tung", { label: "Tung", variant: "warning" }],
]);
const effortEntries = Array.from(effortButtonMap.entries());
const timeEntries = [
  { label: "15 min", value: 15 },
  { label: "30 min", value: 30 },
  { label: "45 min", value: 45 },
  { label: "1 time", value: 60 },
];

export default function TimeEntryForm() {
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [effort, setEffort] = useState<Effort>(DefaultEffort);
  const [startTime, setStartTime] = useState(format(new Date(), "HH:mm"));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = crypto.randomUUID();
    const today = new Date();
    const [hours, minutes] = startTime.split(":").map(Number);
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

    setDescription("");
    setDuration(0);
    setEffort(DefaultEffort);
    setStartTime(format(new Date(), "HH:mm"));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-3">
      <div>
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
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Tid
          <wa-input
            type="time"
            value={startTime}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStartTime(e.target.value)
            }
            required
          />
        </label>
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Tidsbruk: {duration} min
        </label>
        <div className="flex gap-2">
          {timeEntries.map(({ label, value }) => (
            <wa-button
              key={label}
              size="small"
              appearance={value === duration ? "accent" : "filled"}
              onClick={() => setDuration(value)}>
              {label}
            </wa-button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Energiforbruk
        </label>
        <div className="flex gap-2">
          {effortEntries.map(([key, value]) => (
            <wa-button
              key={key}
              appearance={(effort === key ? "accent" : "filled") + " outlined"}
              variant={value.variant}
              size="small"
              onClick={() => setEffort(key)}>
              {value.label}
            </wa-button>
          ))}
        </div>
      </div>

      <wa-button type="submit" variant="brand">
        Legg til
      </wa-button>
    </form>
  );
}

// type CustomElement<T> = Partial<T & React.DOMAttributes<T> & { children: any }>;
declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      [`wa-button`]: any; // CustomElement<HTMLButtonElement>;
      [`wa-input`]: any; // CustomElement<HTMLInputElement>;
    }
  }
}
