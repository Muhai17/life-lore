import type { JourneyEntry, NewJourneyEntry } from "@/types/journey-entry";

const JOURNEY_ENTRIES_STORAGE_KEY = "life-lore:journey-entries";

function getStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function createEntryId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `entry-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function readEntriesFromStorage(): JourneyEntry[] {
  const storage = getStorage();

  if (!storage) {
    return [];
  }

  let rawEntries: string | null = null;

  try {
    rawEntries = storage.getItem(JOURNEY_ENTRIES_STORAGE_KEY);
  } catch {
    return [];
  }

  if (!rawEntries) {
    return [];
  }

  try {
    const entries = JSON.parse(rawEntries);

    if (!Array.isArray(entries)) {
      return [];
    }

    return entries.filter((entry): entry is JourneyEntry => {
      return (
        typeof entry?.id === "string" &&
        typeof entry?.content === "string" &&
        typeof entry?.createdAt === "string" &&
        typeof entry?.updatedAt === "string"
      );
    });
  } catch {
    return [];
  }
}

function writeEntriesToStorage(entries: JourneyEntry[]) {
  const storage = getStorage();

  if (!storage) {
    throw new Error("Journey storage is unavailable.");
  }

  try {
    storage.setItem(JOURNEY_ENTRIES_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    throw new Error("Journey storage could not save this entry.");
  }
}

export function getJourneyEntries() {
  return readEntriesFromStorage();
}

export function saveJourneyEntry(entry: NewJourneyEntry) {
  const now = new Date().toISOString();
  const journeyEntry: JourneyEntry = {
    id: createEntryId(),
    content: entry.content,
    createdAt: now,
    updatedAt: now,
  };

  const entries = readEntriesFromStorage();
  writeEntriesToStorage([journeyEntry, ...entries]);

  return journeyEntry;
}

export function getJourneyEntryById(id: string) {
  return readEntriesFromStorage().find((entry) => entry.id === id);
}

export function clearJourneyEntries() {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  try {
    storage.removeItem(JOURNEY_ENTRIES_STORAGE_KEY);
  } catch {
    return;
  }
}
