import React from "react";
import ReactDOM from "react-dom/client";
import { Desktop, ModalsView, ProzillaOS, Taskbar, WindowsView } from "prozilla-os";

import { appsConfig } from "./os/apps";
import { loadArg2Data } from "./os/virtualDrive";
import "./styles/global.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ProzillaOS
      systemName="ARG2"
      tagLine="Desktop Mystery"
      config={{
        apps: appsConfig,
        virtualDrive: {
          saveData: false,
          defaultData: {
            includeAppsFolder: false,
            includeSourceTree: false,
            loadData: loadArg2Data
          }
        }
      }}
    >
      <Taskbar />
      <WindowsView />
      <ModalsView />
      <Desktop />
    </ProzillaOS>
  </React.StrictMode>
);
