import { openDB } from 'idb';
import { atom } from 'nanostores';

export type Effort = 'avslappende' | 'lett' | 'middels' | 'tung';
export const DefaultEffort: Effort = 'middels';

export interface TimeEntry {
  id: string;
  date: string;
  startTime: string;
  description: string;
  duration: number;
  effort: Effort;
}

const dbName = 'timeTrackingDB';
const storeName = 'timeEntries';

export const timeEntries = atom<Record<string, TimeEntry>>({});

const initDB = async () => {
  // Only initialize IndexedDB in browser environment
  if (typeof window === 'undefined') return null;

  const db = await openDB(dbName, 1, {
    upgrade(db) {
      db.createObjectStore(storeName);
    },
  });
  return db;
};

export const loadEntries = async () => {
  const db = await initDB();
  if (!db) return;

  const entries = await db.getAll(storeName);
  const entriesMap = entries.reduce((acc, entry: TimeEntry) => {
    acc[entry.id] = entry;
    return acc;
  }, {} as Record<string, TimeEntry>);
  timeEntries.set(entriesMap);
};

export const addEntry = async (entry: TimeEntry) => {
  const db = await initDB();
  if (!db) return;

  await db.put(storeName, entry, entry.id);
  const currentEntries = timeEntries.get();
  timeEntries.set({ ...currentEntries, [entry.id]: entry });
};

export const updateEntry = async (entry: TimeEntry) => {
  await addEntry(entry); // We can reuse addEntry since put will update existing entries
};

// Only load entries on the client side
if (typeof window !== 'undefined') {
  loadEntries();
}
