import React from "react";
import { useChapter } from "../state/chapter";

export function LockedNotice({ required }: { required: number }) {
  const { chapter } = useChapter();

  if (chapter >= required) {
    return null;
  }

  return (
    <div className="locked">
      <strong>ロック中</strong>
      <p>この内容は Chapter {required} で解放されます。</p>
      <p>現在の章: Chapter {chapter}</p>
    </div>
  );
}
