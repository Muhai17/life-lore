export type DailyQuestCategory =
  | "knowledge"
  | "creation"
  | "health"
  | "social"
  | "wealth"
  | "general";

export type DailyQuestRewardPreview = {
  resourceType:
    | "knowledgeScroll"
    | "creationShard"
    | "lifeEmber"
    | "companions"
    | "coinPouch";
  amount: number;
};

export type DailyQuest = {
  id: string;
  title: string;
  description?: string;
  category?: DailyQuestCategory;
  rewardPreview?: DailyQuestRewardPreview;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
};

export type NewDailyQuest = {
  title: string;
  description?: string;
  category?: DailyQuestCategory;
  rewardPreview?: DailyQuestRewardPreview;
};

export type DailyQuestCompletion = {
  id: string;
  questId: string;
  completedDate: string;
  completedAt: string;
};
