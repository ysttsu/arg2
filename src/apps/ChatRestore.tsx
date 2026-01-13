import React, { useMemo, useState } from "react";
import { WindowProps } from "prozilla-os";

import { LockedNotice } from "../components/LockedNotice";
import { useChapter } from "../state/chapter";

type ChatEntry = { time: string; who: string; text: string };

const baseLog: ChatEntry[] = [
  { time: "12/15 23:10", who: "自分", text: "連絡先を整理しておく" },
  { time: "12/15 23:45", who: "自分", text: "明日は大事な日" },
  { time: "12/16 07:30", who: "自分", text: "準備はできた" },
  { time: "12/16 12:??", who: "system", text: "[データ欠落]" },
  { time: "12/16 15:20", who: "自分", text: "やっと終わった" },
  { time: "12/16 18:40", who: "自分", text: "帰路につく" }
];

const partialLog: ChatEntry[] = [
  { time: "12/15 23:45", who: "自分", text: "明日は大事な日" },
  { time: "12/16 07:30", who: "自分", text: "準備はできた" },
  { time: "12/16 12:??", who: "system", text: "[データ破損]" },
  { time: "12/16 15:20", who: "自分", text: "やっと終わった" }
];

const fullLog: ChatEntry[] = [
  { time: "12/15 23:45", who: "自分", text: "明日決行する" },
  { time: "12/16 07:30", who: "自分", text: "準備は完璧。例のものは収納ケースに入れた" },
  { time: "12/16 12:15", who: "自分", text: "会場に着いた。警備は予想通り" },
  { time: "12/16 12:34", who: "自分", text: "完了。北側階段、誰も見ていない" },
  { time: "12/16 15:20", who: "自分", text: "やっと終わった。これで全部終わる" },
  { time: "12/16 23:00", who: "自分", text: "このログを削除して差し替え版を作る" }
];

export function ChatRestore({ app }: WindowProps) {
  const { chapter, setChapter } = useChapter();
  const [stage, setStage] = useState<"missing" | "partial" | "full">("missing");

  const log = useMemo(() => {
    if (stage === "partial") return partialLog;
    if (stage === "full") return fullLog;
    return baseLog;
  }, [stage]);

  const status = stage === "full" ? "完全復元" : stage === "partial" ? "部分復元" : "欠落あり";

  return (
    <div className="app-shell">
      <div className="section">
        <h2>{app.name}</h2>
        <p>チャットログの欠落を発見し、段階的に復元する。</p>
        <span className="badge">状態: {status}</span>
      </div>

      <LockedNotice required={2} />

      <div className="section">
        <h2>チャットログ</h2>
        <div className="grid">
          {log.map((entry) => (
            <div key={`${entry.time}-${entry.text}`} className={`chat-line ${entry.who === "system" ? "system" : ""}`}>
              <div>{entry.time}</div>
              <strong>{entry.who}</strong>
              <div>{entry.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>復元操作</h2>
        <div className="button-row">
          <button
            type="button"
            className="primary"
            disabled={stage !== "missing"}
            onClick={() => {
              setStage("partial");
              if (chapter < 2) {
                setChapter(2);
              }
            }}
          >
            部分復元を試みる
          </button>
          <button
            type="button"
            className="ghost"
            disabled={stage !== "partial"}
            onClick={() => setStage("full")}
          >
            断片を読み込む
          </button>
        </div>
        {stage === "partial" && (
          <p>完全復元にはバックアップ断片が必要です。</p>
        )}
        {stage === "full" && (
          <div className="card">
            <strong>完全復元成功</strong>
            <p>決定打となるログが復元されました。</p>
          </div>
        )}
      </div>
    </div>
  );
}
