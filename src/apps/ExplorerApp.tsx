import React from "react";
import { WindowProps } from "prozilla-os";

import { LockedNotice } from "../components/LockedNotice";
import { useChapter } from "../state/chapter";

export function ExplorerApp({ app }: WindowProps) {
  const { chapter } = useChapter();

  return (
    <div className="app-shell">
      <div className="section">
        <h2>{app.name}</h2>
        <p>主要なフォルダ構成を確認する。</p>
        <span className="badge">Chapter {chapter}</span>
      </div>

      <div className="section">
        <h2>ファイル一覧（抜粋）</h2>
        <div className="grid">
          <div className="card">Documents/CASE.zip</div>
          <div className="card">Documents/Photos/</div>
          <div className="card">Documents/Receipts/</div>
          <div className="card">Documents/Tickets/</div>
          <div className="card">Documents/Notes/</div>
        </div>
      </div>

      <div className="section">
        <h2>隠しファイル</h2>
        <LockedNotice required={3} />
        {chapter >= 3 && (
          <div className="grid">
            <div className="card">Documents/.version_history/</div>
            <div className="card">Documents/.sync_cache/</div>
          </div>
        )}
      </div>
    </div>
  );
}
