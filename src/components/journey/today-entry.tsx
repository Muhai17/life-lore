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

    saveJourneyEntry({ content: trimmedContent });
    setContent("");
    setErrorMessage("");
    setSuccessMessage("Journey Recorded");
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

      <div className="mt-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-muted-foreground">
            {content.length} / {MAX_ENTRY_LENGTH}
          </p>
          {errorMessage && (
            <p className="mt-2 text-xs text-destructive">{errorMessage}</p>
          )}
          {successMessage && (
            <div className="mt-3 rounded-lg border border-white/70 bg-secondary/60 px-3 py-2">
              <p className="text-sm font-medium text-primary">
                {successMessage}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                旅途已记录
              </p>
            </div>
          )}
        </div>
        <Button onClick={handleSave}>Advance Journey 推进旅程</Button>
      </div>
    </SurfaceCard>
  );
}
