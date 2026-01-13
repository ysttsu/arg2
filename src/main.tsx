import React from "react";
import ReactDOM from "react-dom/client";
import { Desktop, ModalsView, ProzillaOS, Taskbar, WindowsView } from "prozilla-os";

import { appsConfig } from "./os/apps";
import { ChapterProvider } from "./state/chapter";
import "./styles/global.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ChapterProvider>
      <ProzillaOS
        systemName="ARG2"
        tagLine="Desktop Mystery"
        config={{
          apps: appsConfig
        }}
      >
        <Taskbar />
        <WindowsView />
        <ModalsView />
        <Desktop />
      </ProzillaOS>
    </ChapterProvider>
  </React.StrictMode>
);
