import React, { createContext, useContext, useMemo, useState } from "react";

const CHAPTER_KEY = "arg2Chapter";

interface ChapterContextValue {
  chapter: number;
  setChapter: (chapter: number) => void;
}

const ChapterContext = createContext<ChapterContextValue | null>(null);

function readChapter(): number {
  const raw = window.localStorage.getItem(CHAPTER_KEY);
  const parsed = Number(raw ?? "0");
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function ChapterProvider({ children }: { children: React.ReactNode }) {
  const [chapter, setChapterState] = useState(() => readChapter());

  const setChapter = (next: number) => {
    const safe = Math.max(0, Math.min(3, Number(next)));
    setChapterState(safe);
    window.localStorage.setItem(CHAPTER_KEY, String(safe));
  };

  const value = useMemo(() => ({ chapter, setChapter }), [chapter]);
  return <ChapterContext.Provider value={value}>{children}</ChapterContext.Provider>;
}

export function useChapter() {
  const ctx = useContext(ChapterContext);
  if (!ctx) {
    throw new Error("useChapter must be used inside ChapterProvider");
  }
  return ctx;
}
