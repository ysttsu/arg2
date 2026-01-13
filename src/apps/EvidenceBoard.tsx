import React, { useMemo, useState } from "react";
import { WindowProps } from "prozilla-os";

import { LockedNotice } from "../components/LockedNotice";
import { useChapter } from "../state/chapter";

const evidenceItems = [
  {
    id: "hotel_reservation",
    title: "ホテル予約確認",
    category: "A",
    summary: "2025-12-21 みなとシティホテル / 予約ID HTL-20251221-0421"
  },
  {
    id: "shinkansen_eticket",
    title: "新幹線 eチケット",
    category: "A",
    summary: "2025-12-21 東京→新横浜 / HIKARI 521"
  },
  {
    id: "entrance_mail",
    title: "入場受付 完了メール",
    category: "B",
    summary: "2025-12-21 10:05 喜多川ホール / QR発行済み"
  },
  {
    id: "venue_eticket",
    title: "電子チケット",
    category: "B",
    summary: "2025-12-21 13:00 喜多川ホール"
  },
  {
    id: "live_photo",
    title: "現地写真",
    category: "C",
    summary: "2025-12-21 18:42 裏口ポスター / EXIF付き"
  },
  {
    id: "receipt_photo",
    title: "現地レシート",
    category: "C",
    summary: "2025-12-21 19:10 会場近隣店舗 / 日付明記"
  }
];

export function EvidenceBoard({ app }: WindowProps) {
  const { chapter, setChapter } = useChapter();
  const [selections, setSelections] = useState({ A: "", B: "", C: "" });
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState<string | null>(null);

  const ready = useMemo(
    () => Object.values(selections).every(Boolean),
    [selections]
  );

  const placeItem = (itemId: string, category: string) => {
    const item = evidenceItems.find((entry) => entry.id === itemId);
    if (!item || item.category !== category) {
      return;
    }
    setSelections((prev) => ({ ...prev, [category]: item.id }));
  };

  const reset = () => {
    setSelections({ A: "", B: "", C: "" });
    setSubmitted(false);
  };

  const submit = () => {
    if (!ready || submitted) return;
    setSubmitted(true);
    if (chapter < 1) {
      setChapter(1);
    }
  };

  const statusText = submitted ? "提出済み" : ready ? "提出可能" : "未提出";

  return (
    <div className="app-shell">
      <div className="section">
        <h2>{app.name}</h2>
        <p>カテゴリA/B/Cから1件ずつ選び、死後も動いている痕跡を確定する。</p>
        <span className="badge">状態: {statusText}</span>
      </div>

      <LockedNotice required={1} />

      <div className="section">
        <h2>証拠一覧</h2>
        <div className="evidence-list">
          {evidenceItems.map((item) => (
            <div
              key={item.id}
              className="evidence-item"
              draggable
              onDragStart={(event) => {
                event.dataTransfer.setData("text/plain", item.id);
              }}
              onClick={() => placeItem(item.id, item.category)}
            >
              <strong>カテゴリ {item.category}</strong>
              <div>{item.title}</div>
              <small>{item.summary}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>スクラップボード</h2>
        <div className="grid two">
          {(["A", "B", "C"] as const).map((category) => {
            const selected = evidenceItems.find((item) => item.id === selections[category]);
            return (
              <div
                key={category}
                className={`slot ${dragOver === category ? "drag-over" : ""}`}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragOver(category);
                }}
                onDragLeave={() => setDragOver(null)}
                onDrop={(event) => {
                  event.preventDefault();
                  setDragOver(null);
                  placeItem(event.dataTransfer.getData("text/plain"), category);
                }}
              >
                <strong>カテゴリ {category}</strong>
                {selected ? (
                  <div>
                    <div>{selected.title}</div>
                    <small>{selected.summary}</small>
                  </div>
                ) : (
                  <div>ここに配置</div>
                )}
              </div>
            );
          })}
        </div>

        <div className="button-row" style={{ marginTop: 12 }}>
          <button type="button" className="ghost" onClick={reset}>
            リセット
          </button>
          <button type="button" className="primary" onClick={submit} disabled={!ready || submitted}>
            提出する
          </button>
        </div>

        {submitted && (
          <div className="card">
            <strong>提出完了</strong>
            <p>パスワードのヒントが解放されました。</p>
            <p>パス: 推しの誕生日（MMDD）</p>
          </div>
        )}
      </div>
    </div>
  );
}
