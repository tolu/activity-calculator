import { useStore } from "@nanostores/react";
import { timeEntries, type TimeEntry } from "../store/timeEntries";
import { format } from "date-fns";

export const TodayEntries = () => {
  const allEntries = useStore(timeEntries);
  const today = new Date();
  const dateStr = format(today, "yyyy-MM-dd");
  const entries = Object.values(allEntries)
    .filter((entry) => entry.date.startsWith(dateStr))
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-8">
      <h3 className="font-bold mb-2">Dagens aktiviteter</h3>
      <table className="wa-zebra-rows">
        <thead>
          <tr>
            <th>Tid</th>
            <th>Aktivitet</th>
            <th>Tidsbruk</th>
            <th>Energiforbruk</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.startTime}</td>
              <td>{entry.description}</td>
              <td>{entry.duration} min</td>
              <td>{entry.effort}</td>
              <td>
                {/* TODO: editera og slette */}
                <wa-icon-button
                  name="pen-to-square"
                  variant="solid"
                  label="Edit"
                  style={{ fontSize: "1rem" }}></wa-icon-button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// type CustomElement<T> = Partial<T & React.DOMAttributes<T> & { children: any }>;
declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      [`wa-icon-button`]: any; // CustomElement<HTMLButtonElement>;
    }
  }
}
