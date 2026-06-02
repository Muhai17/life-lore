import type { JourneyEntry, NewJourneyEntry } from "@/types/journey-entry";

const JOURNEY_ENTRIES_STORAGE_KEY = "life-lore:journey-entries";

function canUseStorage() {
  return typeof window !== "undefined" && !!window.localStorage;
}

function createEntryId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `entry-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function readEntriesFromStorage(): JourneyEntry[] {
  if (!canUseStorage()) {
    return [];
  }

  const rawEntries = window.localStorage.getItem(JOURNEY_ENTRIES_STORAGE_KEY);

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
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(
    JOURNEY_ENTRIES_STORAGE_KEY,
    JSON.stringify(entries)
  );
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
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(JOURNEY_ENTRIES_STORAGE_KEY);
}
