import { App, AppsConfig } from "prozilla-os";

import { BrowserApp } from "../apps/BrowserApp";
import { ChatRestore } from "../apps/ChatRestore";
import { ControlCenter } from "../apps/ControlCenter";
import { EvidenceBoard } from "../apps/EvidenceBoard";
import { ExplorerApp } from "../apps/ExplorerApp";
import { NotesApp } from "../apps/NotesApp";
import { VersionRestore } from "../apps/VersionRestore";
import { makeIcon } from "./icons";

const icons = {
  control: makeIcon("CC", "#3b5a5a"),
  explorer: makeIcon("EX", "#4d9cff"),
  browser: makeIcon("BR", "#8f4b2d"),
  notes: makeIcon("NT", "#8a8f2d"),
  chat: makeIcon("CH", "#a23b30"),
  evidence: makeIcon("EV", "#7a4b8f"),
  version: makeIcon("VR", "#2d6f8f")
};

const controlCenter = new App("Control Center", "control-center", ControlCenter)
  .setDescription("章の進行を切り替える")
  .setIconUrl(icons.control)
  .setPinnedByDefault(true)
  .setLaunchAtStartup(true);

const explorer = new App("Explorer", "explorer", ExplorerApp)
  .setDescription("ファイルを探索する")
  .setIconUrl(icons.explorer)
  .setPinnedByDefault(true);

const browser = new App("Browser", "browser", BrowserApp)
  .setDescription("公式発表と履歴")
  .setIconUrl(icons.browser)
  .setPinnedByDefault(true);

const notes = new App("Notes", "notes", NotesApp)
  .setDescription("調査メモを確認")
  .setIconUrl(icons.notes)
  .setPinnedByDefault(true);

const chat = new App("Chat", "chat", ChatRestore)
  .setDescription("欠落DMを復元")
  .setIconUrl(icons.chat)
  .setPinnedByDefault(true);

const evidenceBoard = new App("Evidence Board", "evidence-board", EvidenceBoard)
  .setDescription("3点一致で証拠を提出")
  .setIconUrl(icons.evidence);

const versionRestore = new App("Version Restore", "version-restore", VersionRestore)
  .setDescription("旧版復元と差分比較")
  .setIconUrl(icons.version);

export const appsConfig = new AppsConfig({
  apps: [
    controlCenter,
    explorer,
    browser,
    notes,
    chat,
    evidenceBoard,
    versionRestore
  ]
});
