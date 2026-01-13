import React from "react";
import { WindowProps } from "prozilla-os";

import { useChapter } from "../state/chapter";

export function ControlCenter({ app }: WindowProps) {
  const { chapter, setChapter } = useChapter();

  return (
    <div className="app-shell">
      <div className="section">
        <h2>{app.name}</h2>
        <p>章の進行を切り替えて挙動を確認できます。</p>
        <span className="badge">現在: Chapter {chapter}</span>
      </div>
      <div className="section">
        <h2>章を切り替える</h2>
        <div className="button-row">
          {[0, 1, 2, 3].map((value) => (
            <button
              key={value}
              type="button"
              className={value === chapter ? "primary" : ""}
              onClick={() => setChapter(value)}
            >
              Chapter {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
