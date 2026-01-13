import React from "react";
import { WindowProps } from "prozilla-os";

import { LockedNotice } from "../components/LockedNotice";

export function NotesApp({ app }: WindowProps) {
  return (
    <div className="app-shell">
      <div className="section">
        <h2>{app.name}</h2>
        <p>現行版の調査メモと差分の要点を確認する。</p>
      </div>

      <div className="section">
        <h2>investigation_notes_v2.txt</h2>
        <div className="grid">
          <div className="card">結論: 公式発表は不自然だ。関係者Aの動きが説明できない。</div>
          <div className="card">控室の出入り記録が「記録なし」なのはおかしい。</div>
          <div className="card">当日の映像は公開されていない。</div>
        </div>
      </div>

      <div className="section">
        <h2>旧版との差分</h2>
        <LockedNotice required={3} />
        <div className="grid">
          <div className="card">12/16 12:34 北側階段の悲鳴（事前知識）</div>
          <div className="card">血痕位置の具体的記述</div>
          <div className="card">控室の鍵の所在</div>
        </div>
      </div>
    </div>
  );
}
