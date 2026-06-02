"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardHeader, SurfaceCard } from "@/components/ui/surface-card";
import { saveJourneyEntry } from "@/lib/journey-storage";

const MAX_ENTRY_LENGTH = 1000;

export function TodayEntry() {
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleSave() {
    const trimmedContent = content.trim();

    setSuccessMessage("");

    if (!trimmedContent) {
      setErrorMessage("Please write something first. 请先写下一点内容。");
      return;
    }

    try {
      saveJourneyEntry({ content: trimmedContent });
      setContent("");
      setErrorMessage("");
      setSuccessMessage("Journey Recorded");
    } catch {
      setErrorMessage("Unable to save entry. 暂时无法保存这段旅途。");
    }
  }

  return (
    <SurfaceCard>
      <CardHeader title="Today Entry" description="今日记录" />

      <textarea
        value={content}
        onChange={(event) => {
          setContent(event.target.value.slice(0, MAX_ENTRY_LENGTH));
          setErrorMessage("");
          setSuccessMessage("");
        }}
        className="mt-5 min-h-48 w-full resize-none rounded-lg border border-white/80 bg-background/70 p-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        maxLength={MAX_ENTRY_LENGTH}
        placeholder="记录你的经历、想法、感受……"
      />

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">
            {content.length} / {MAX_ENTRY_LENGTH}
          </p>
          {errorMessage && (
            <div className="mt-3 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2">
              <p className="break-words text-sm font-medium text-destructive">
                {errorMessage}
              </p>
            </div>
          )}
          {successMessage && (
            <div className="mt-3 rounded-lg border border-white/70 bg-secondary/70 px-3 py-2">
              <p className="text-sm font-medium text-primary">
                {successMessage}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                旅途已记录
              </p>
            </div>
          )}
        </div>
        <Button className="w-full sm:w-auto" onClick={handleSave}>
          Advance Journey 推进旅程
        </Button>
      </div>
    </SurfaceCard>
  );
}
