# ファイルツリーとアセット一覧

このドキュメントは、初期ファイルツリー、章ごとの解放、短い内容サマリを定義する。

## ツリー（案）

```
Desktop/
  sticky_note_login.txt
  sticky_note_restore.txt
  wallpaper_idol.jpg
Documents/
  request_letter.txt
  CASE.zip
  Photos/
    live_venue_photo.jpg
    alibi_photo_1.png
    alibi_photo_2.png
  Receipts/
    hotel_reservation.pdf
    shinkansen_eticket.pdf
  Tickets/
    entrance_mail.eml
    venue_eticket.pdf
  Notes/
    investigation_notes_v2.txt
    schedule_notes.txt
    playlist.txt
  Browser/
    official_announcement.html
    browser_history.txt
  Chat/
    chat_log.txt
    dm_mislead.txt
  Finance/
    circle_budget.csv
  Trash/
    deleted_log.txt
  .sync_cache/
    backup_fragments.dat
  .version_history/
    investigation_notes_v1.txt
```

## ファイル一覧と章マッピング

凡例:
- Ch0, Ch1, Ch2, Ch3 は章の解放タイミング。
- 「状態変化」は、内容や表示がプレイ中に変わるもの。

| パス | 章 | 状態変化 | サマリ |
| --- | --- | --- | --- |
| Desktop/sticky_note_login.txt | Ch0 | なし | ログイン用ヒント付箋。壁紙やファイル名に紐づく手がかりを示す。デスクトップから推測できる導線を作る。 |
| Desktop/sticky_note_restore.txt | Ch0 | なし | 旧版復元や `.version_history/` を示す付箋。隠しファイルの発見と復元の前提を植える。 |
| Desktop/wallpaper_idol.jpg | Ch0 | なし | 推しの壁紙。誕生日や日付モチーフが見える。Ch1のCASE.zipパス推測に使う。 |
| Documents/request_letter.txt | Ch0 | なし | 遺族からの依頼文。「メッセージ探し」と「資料回収」を明示し、覗き見る行為を正当化する。 |
| Documents/CASE.zip | Ch0（ロック）, Ch2（解放） | あり（ロック/解放） | 調査資料のアーカイブ。Ch1の3点一致提出後に開ける。 |
| Documents/Photos/live_venue_photo.jpg | Ch1 | なし | 死後の日付で現地にいた証拠。EXIFで日時・位置が確認できる。 |
| Documents/Photos/alibi_photo_1.png | Ch2 | なし | 不自然に整ったアリバイ画像。alibi_photo_2.pngと並べて違和感を強める。 |
| Documents/Photos/alibi_photo_2.png | Ch2 | なし | ほぼ同構図のアリバイ画像。わずかな差分で作為を示唆する。 |
| Documents/Receipts/hotel_reservation.pdf | Ch1 | なし | 死後の日付の宿泊予約。証拠カテゴリA（交通/宿）。 |
| Documents/Receipts/shinkansen_eticket.pdf | Ch1 | なし | 死後の日付の新幹線eチケット。証拠カテゴリAの代替。 |
| Documents/Tickets/entrance_mail.eml | Ch1 | なし | 死後の日付の受付完了メール。証拠カテゴリB（受付/入場）。 |
| Documents/Tickets/venue_eticket.pdf | Ch1 | なし | 死後の日付の電子チケット。証拠カテゴリBの代替。 |
| Documents/Notes/investigation_notes_v2.txt | Ch2 | なし | 読ませる体裁の調査メモ。疑念を誘導するが整いすぎている。 |
| Documents/Notes/schedule_notes.txt | Ch1 | なし | 「下見」「導線」など計画性を示す語彙を含む予定メモ。 |
| Documents/Notes/playlist.txt | Ch0 | なし | オタクPCの雰囲気用プレイリスト。 |
| Documents/Browser/official_announcement.html | Ch2 | なし | 事故の公式発表の魚拓。タイムラインの基準。 |
| Documents/Browser/browser_history.txt | Ch2 | なし | 会場・警備・動線などの検索履歴。下見のニュアンスを補強。 |
| Documents/Chat/chat_log.txt | Ch2, Ch3 | あり（部分/完全復元） | Ch2で欠落表示、Ch3で完全復元されるチャットログ。G2の中核。 |
| Documents/Chat/dm_mislead.txt | Ch2 | なし | 別人物を疑わせるDM。ミスリード用。 |
| Documents/Finance/circle_budget.csv | Ch0 | なし | サークル会計表。雰囲気用。 |
| Documents/Trash/deleted_log.txt | Ch2 | なし | 削除ログ。証拠隠滅の気配を出す。 |
| Documents/.sync_cache/backup_fragments.dat | Ch3（隠し） | なし | チャット完全復元に必要な断片ファイル。G2後半の鍵。 |
| Documents/.version_history/investigation_notes_v1.txt | Ch3（隠し） | なし | 旧版メモ。事前知識矛盾の決定打。G3の鍵。 |

## 状態変化/インタラクティブ一覧

- `Documents/CASE.zip`: Ch0/Ch1でロック、Ch2で解放。
- `Documents/Chat/chat_log.txt`: Ch2は欠落版、Ch3で完全版に差し替え。
- 隠しフォルダ `.version_history/` と `.sync_cache/`: Ch3で表示可能になる。

## 必須11アイテム対応

`improved_gdd.md` の必須11アイテムをすべて含めている。

- request_letter.txt
- sticky_note_login.txt / sticky_note_restore.txt
- hotel_reservation.pdf（または shinkansen_eticket.pdf）
- entrance_mail.eml（または venue_eticket.pdf）
- live_venue_photo.jpg
- CASE.zip
- official_announcement.html
- investigation_notes_v2.txt
- investigation_notes_v1.txt
- chat_log.txt（状態変化）
- alibi_photo_1.png（比較用に alibi_photo_2.png を追加）
