import type {
  DailyQuest,
  DailyQuestCompletion,
  NewDailyQuest,
} from "@/types/daily-quest";

const DAILY_QUESTS_STORAGE_KEY = "life-lore:daily-quests";
const DAILY_QUEST_COMPLETIONS_STORAGE_KEY =
  "life-lore:daily-quest-completions";

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

function createStorageId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function isDailyQuest(value: unknown): value is DailyQuest {
  if (!value || typeof value !== "object") {
    return false;
  }

  const quest = value as DailyQuest;

  return (
    typeof quest.id === "string" &&
    typeof quest.title === "string" &&
    typeof quest.createdAt === "string" &&
    typeof quest.updatedAt === "string" &&
    typeof quest.isActive === "boolean"
  );
}

function isDailyQuestCompletion(
  value: unknown
): value is DailyQuestCompletion {
  if (!value || typeof value !== "object") {
    return false;
  }

  const completion = value as DailyQuestCompletion;

  return (
    typeof completion.id === "string" &&
    typeof completion.questId === "string" &&
    typeof completion.completedDate === "string" &&
    typeof completion.completedAt === "string"
  );
}

function readStoredArray<T>(
  storageKey: string,
  validator: (value: unknown) => value is T
) {
  const storage = getStorage();

  if (!storage) {
    return [];
  }

  let rawValue: string | null = null;

  try {
    rawValue = storage.getItem(storageKey);
  } catch {
    return [];
  }

  if (!rawValue) {
    return [];
  }

  try {
    const value = JSON.parse(rawValue);

    if (!Array.isArray(value)) {
      return [];
    }

    return value.filter(validator);
  } catch {
    return [];
  }
}

function writeStoredArray<T>(storageKey: string, values: T[]) {
  const storage = getStorage();

  if (!storage) {
    throw new Error("Daily Quest storage is unavailable.");
  }

  try {
    storage.setItem(storageKey, JSON.stringify(values));
  } catch {
    throw new Error("Daily Quest storage could not save changes.");
  }
}

function readDailyQuestsFromStorage() {
  return readStoredArray(DAILY_QUESTS_STORAGE_KEY, isDailyQuest);
}

function writeDailyQuestsToStorage(quests: DailyQuest[]) {
  writeStoredArray(DAILY_QUESTS_STORAGE_KEY, quests);
}

function readDailyQuestCompletionsFromStorage() {
  return readStoredArray(
    DAILY_QUEST_COMPLETIONS_STORAGE_KEY,
    isDailyQuestCompletion
  );
}

function writeDailyQuestCompletionsToStorage(
  completions: DailyQuestCompletion[]
) {
  writeStoredArray(DAILY_QUEST_COMPLETIONS_STORAGE_KEY, completions);
}

export function getDailyQuests() {
  return readDailyQuestsFromStorage();
}

export function saveDailyQuest(quest: NewDailyQuest) {
  const now = new Date().toISOString();
  const dailyQuest: DailyQuest = {
    id: createStorageId("daily-quest"),
    title: quest.title,
    description: quest.description,
    category: quest.category,
    rewardPreview: quest.rewardPreview,
    createdAt: now,
    updatedAt: now,
    isActive: true,
  };

  const quests = readDailyQuestsFromStorage();
  writeDailyQuestsToStorage([dailyQuest, ...quests]);

  return dailyQuest;
}

export function updateDailyQuest(
  questId: string,
  updates: Partial<
    Pick<
      DailyQuest,
      "title" | "description" | "category" | "rewardPreview" | "isActive"
    >
  >
) {
  const quests = readDailyQuestsFromStorage();
  const now = new Date().toISOString();
  const updatedQuests = quests.map((quest) => {
    if (quest.id !== questId) {
      return quest;
    }

    return {
      ...quest,
      ...updates,
      updatedAt: now,
    };
  });

  writeDailyQuestsToStorage(updatedQuests);

  return updatedQuests.find((quest) => quest.id === questId) ?? null;
}

export function deleteDailyQuest(questId: string) {
  const quests = readDailyQuestsFromStorage();
  const completions = readDailyQuestCompletionsFromStorage();

  writeDailyQuestsToStorage(quests.filter((quest) => quest.id !== questId));
  writeDailyQuestCompletionsToStorage(
    completions.filter((completion) => completion.questId !== questId)
  );
}

export function getTodayCompletions() {
  const today = getLocalDateKey();

  return readDailyQuestCompletionsFromStorage().filter((completion) => {
    return completion.completedDate === today;
  });
}

export function toggleDailyQuestCompletion(questId: string) {
  const today = getLocalDateKey();
  const completions = readDailyQuestCompletionsFromStorage();
  const existingCompletion = completions.find((completion) => {
    return completion.questId === questId && completion.completedDate === today;
  });

  if (existingCompletion) {
    const updatedCompletions = completions.filter((completion) => {
      return completion.id !== existingCompletion.id;
    });

    writeDailyQuestCompletionsToStorage(updatedCompletions);

    return null;
  }

  const now = new Date().toISOString();
  const completion: DailyQuestCompletion = {
    id: createStorageId("daily-quest-completion"),
    questId,
    completedDate: today,
    completedAt: now,
  };

  writeDailyQuestCompletionsToStorage([completion, ...completions]);

  return completion;
}
