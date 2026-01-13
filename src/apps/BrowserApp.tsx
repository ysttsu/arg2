import React from "react";
import { WindowProps } from "prozilla-os";

import { LockedNotice } from "../components/LockedNotice";

export function BrowserApp({ app }: WindowProps) {
  return (
    <div className="app-shell">
      <div className="section">
        <h2>{app.name}</h2>
        <p>公式発表の魚拓と履歴を確認する。</p>
      </div>

      <div className="section">
        <h2>公式発表</h2>
        <LockedNotice required={2} />
        <div className="grid">
          <div className="card">2025-12-17 10:00</div>
          <div className="card">喜多川ホールで事故発生</div>
          <div className="card">北側階段 12:34頃</div>
        </div>
      </div>

      <div className="section">
        <h2>履歴</h2>
        <div className="grid">
          <div className="card">喜多川ホール 導線</div>
          <div className="card">警備 配置 2025</div>
          <div className="card">階段 北側 カメラ</div>
        </div>
      </div>
    </div>
  );
}
