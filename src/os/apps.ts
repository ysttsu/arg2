import { App, AppsConfig, browser, fileExplorer, mediaViewer, textEditor } from "prozilla-os";

import { ChatRestore } from "../apps/ChatRestore";
import { makeIcon } from "./icons";

const chatIcon = makeIcon("CH", "#a23b30");

const chat = new App("Chat", "chat", ChatRestore)
  .setDescription("欠落DMを復元")
  .setIconUrl(chatIcon)
  .setShowDesktopIcon(true)
  .setPinnedByDefault(true);

const explorerApp = fileExplorer
  .setName("Explorer")
  .setShowDesktopIcon(true)
  .setPinnedByDefault(true);

const browserApp = browser
  .setName("Browser")
  .setShowDesktopIcon(true)
  .setPinnedByDefault(true);

const textEditorApp = textEditor
  .setName("Notes")
  .setShowDesktopIcon(true)
  .setPinnedByDefault(true)
  .setAssociatedExtensions([
    ...(textEditor.associatedExtensions ?? []),
    "pdf",
    "eml",
    "log",
    "md"
  ]);

const mediaViewerApp = mediaViewer
  .setName("Media Viewer")
  .setPinnedByDefault(false)
  .setShowDesktopIcon(false);

export const appsConfig = new AppsConfig({
  apps: [explorerApp, browserApp, textEditorApp, mediaViewerApp, chat]
});
