import React, { useState } from "react";
import { WindowProps } from "prozilla-os";

import { LockedNotice } from "../components/LockedNotice";
import { useChapter } from "../state/chapter";

const v1Lines = [
  "12/09時点のメモ:",
  "12/16 12:34、北側階段で悲鳴が聞こえたはず。",
  "血痕は階段の3段目あたりに残る可能性。",
  "関係者Aが北側に向かったのは昼過ぎ。",
  "控室の鍵は二つある。予備は受付の引き出し。",
  "私のアリバイ写真は昼前に撮っておく。"
];

const v2Lines = [
  "調査メモ（改訂版）:",
  "当日の動線はまだ確証がない。",
  "血痕位置については現時点で不明。",
  "関係者Aの行動は記録不足のため断定できない。",
  "控室の鍵の所在は未確認。",
  "アリバイ写真は別途保管済み。"
];

const alertIndexes = new Set([1, 2, 4]);

export function VersionRestore({ app }: WindowProps) {
  const { chapter, setChapter } = useChapter();
  const [hiddenShown, setHiddenShown] = useState(false);
  const [compared, setCompared] = useState(false);

  return (
    <div className="app-shell">
      <div className="section">
        <h2>{app.name}</h2>
        <p>隠しフォルダを表示し、旧版メモとの矛盾を確定する。</p>
        <span className="badge">隠しファイル: {hiddenShown ? "表示中" : "未表示"}</span>
      </div>

      <LockedNotice required={3} />

      <div className="section">
        <h2>ファイル一覧</h2>
        <div className="grid">
          <div className="card">Documents/Notes/investigation_notes_v2.txt</div>
          <div className="card">Documents/Notes/schedule_notes.txt</div>
          <div className="card">Documents/Browser/official_announcement.html</div>
        </div>
        <div className="button-row" style={{ marginTop: 12 }}>
          <button
            type="button"
            className="primary"
            disabled={hiddenShown}
            onClick={() => {
              setHiddenShown(true);
              if (chapter < 3) {
                setChapter(3);
              }
            }}
          >
            隠しファイルを表示
          </button>
        </div>
        {hiddenShown && (
          <div className="card" style={{ marginTop: 12 }}>
            Documents/.version_history/investigation_notes_v1.txt
            <div className="button-row" style={{ marginTop: 8 }}>
              <button
                type="button"
                className="ghost"
                disabled={compared}
                onClick={() => setCompared(true)}
              >
                v1とv2を比較する
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="section">
        <h2>差分比較</h2>
        {compared ? (
          <div className="grid two">
            <div className="card">
              <strong>v1（旧版）</strong>
              <div className="grid" style={{ marginTop: 10 }}>
                {v1Lines.map((line, index) => (
                  <div key={line} className={`diff-line ${alertIndexes.has(index) ? "alert" : ""}`}>
                    {line}
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <strong>v2（現行）</strong>
              <div className="grid" style={{ marginTop: 10 }}>
                {v2Lines.map((line, index) => (
                  <div key={line} className={`diff-line ${alertIndexes.has(index) ? "alert" : ""}`}>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>比較を開始すると差分が表示されます。</p>
        )}
        {compared && (
          <div className="card" style={{ marginTop: 12 }}>
            <strong>矛盾を確定</strong>
            <p>事件当日にしか知り得ない情報が旧版に含まれていた。</p>
          </div>
        )}
      </div>
    </div>
  );
}
