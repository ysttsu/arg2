import { VirtualFile, VirtualFolder, VirtualRoot } from "prozilla-os";

function makeSvgImage(label: string, color: string) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
  <rect width="800" height="450" fill="${color}" />
  <text x="400" y="240" font-size="64" font-family="Arial, sans-serif" fill="#ffffff" text-anchor="middle">${label}</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function ensureFolder(parent: VirtualFolder, name: string) {
  const existing = parent.findSubFolder(name);
  if (existing && existing instanceof VirtualFolder) {
    return existing;
  }

  let created: VirtualFolder | null = null;
  parent.createFolder(name, (folder) => {
    created = folder;
  });

  return created ?? (parent.findSubFolder(name) as VirtualFolder);
}

function createTextFile(
  folder: VirtualFolder,
  name: string,
  extension: string,
  content: string | string[]
) {
  let created: VirtualFile | null = null;
  folder.createFile(name, extension, (file) => {
    created = file as VirtualFile;
    file.setContent(content);
  });
  return created as VirtualFile;
}

export function loadArg2Data(root: VirtualRoot) {
  const documents = ensureFolder(root, "Documents");
  const notes = ensureFolder(documents, "Notes");
  const receipts = ensureFolder(documents, "Receipts");
  const tickets = ensureFolder(documents, "Tickets");
  const photos = ensureFolder(documents, "Photos");
  const browser = ensureFolder(documents, "Browser");
  const chat = ensureFolder(documents, "Chat");
  const versionHistory = ensureFolder(documents, ".version_history");
  const syncCache = ensureFolder(documents, ".sync_cache");

  const requestLetter = createTextFile(documents, "request_letter", "txt", [
    "件名: パソコン整理のお願い",
    "",
    "突然のお願いで申し訳ありません。兄（故人）のPC整理を手伝っていただけませんか。",
    "探してほしいものは二つあります。",
    "1) 私たち遺族宛てのメッセージ",
    "2) 警察/弁護士に渡すと言っていた資料",
    "",
    "必要があれば中身を確認してください。よろしくお願いします。"
  ]);

  const notesV2 = createTextFile(notes, "investigation_notes_v2", "txt", [
    "結論: 公式発表は不自然だ。関係者Aの動きが説明できない。",
    "12/16 午前の控室の出入りが『記録なし』なのはおかしい。",
    "目撃証言は北側階段に集中しているのに、警備配置は南側に偏っている。",
    "関係者Aは以前から恨みを口にしていた。証言の改変が疑われる。",
    "当日の映像は公開されていない。公開できない理由がある。",
    "私の行動記録は別途保存してある。外部と共有する予定。"
  ]);

  const notesV1 = createTextFile(versionHistory, "investigation_notes_v1", "txt", [
    "12/09時点のメモ:",
    "12/16 12:34、北側階段で悲鳴が聞こえたはず。",
    "血痕は階段の3段目あたりに残る可能性。",
    "関係者Aが北側に向かったのは昼過ぎ。",
    "控室の鍵は二つある。予備は受付の引き出し。",
    "私のアリバイ写真は昼前に撮っておく。"
  ]);

  createTextFile(notes, "schedule_notes", "txt", [
    "12/20 下見（導線確認）",
    "12/21 現地入り / 警備配置メモ",
    "12/22 片付け",
    "語彙: 下見 / 導線 / 警備配置"
  ]);

  createTextFile(receipts, "hotel_reservation", "pdf", [
    "ホテル予約確認",
    "予約ID: HTL-20251221-0421",
    "宿泊: 2025-12-21 〜 2025-12-22",
    "宿: みなとシティホテル（横浜）"
  ]);

  createTextFile(tickets, "entrance_mail", "eml", [
    "件名: 入場受付 完了のお知らせ",
    "日時: 2025-12-21 10:05",
    "会場: 喜多川ホール",
    "内容: QRコード発行済み / 本人確認あり"
  ]);

  const venuePhoto = new VirtualFile("live_venue_photo", "jpg");
  venuePhoto.setSource(makeSvgImage("Venue Photo", "#8f4b2d"));
  photos.files.push(venuePhoto);

  const alibiPhoto = new VirtualFile("alibi_photo_1", "png");
  alibiPhoto.setSource(makeSvgImage("Alibi", "#3b5a5a"));
  photos.files.push(alibiPhoto);

  createTextFile(browser, "official_announcement", "html", [
    "2025年12月17日 10:00",
    "喜多川ホールで発生した事故について",
    "2025年12月16日 12:34頃、北側階段付近で事故が発生しました。"
  ]);

  createTextFile(browser, "browser_history", "txt", [
    "喜多川ホール 導線",
    "警備 配置 2025",
    "階段 北側 カメラ"
  ]);

  const chatLog = createTextFile(chat, "chat_log", "log", [
    "12/15 23:45 自分: 明日は大事な日",
    "12/16 07:30 自分: 準備はできた",
    "12/16 12:?? [データ欠落]",
    "12/16 15:20 自分: やっと終わった"
  ]);

  createTextFile(syncCache, "backup_fragments", "dat", [
    "[binary fragment placeholder]"
  ]);

  const caseZip = createTextFile(documents, "CASE", "zip", "[LOCKED]");
  root.addShortcut("依頼文", requestLetter);
  root.addShortcut("CASE.zip", caseZip);
  root.addShortcut("調査メモ", notesV2);
  root.addShortcut("チャットログ", chatLog);
}
