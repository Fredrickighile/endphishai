import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//  IMPROVED Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        // console.log(" Service Worker registered:", registration.scope);

        // Check for updates every 60 seconds
        setInterval(() => {
          registration.update();
        }, 60000);

        // Listen for new service worker
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          // console.log(" New Service Worker found, installing...");

          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // console.log(" New Service Worker installed, ready to activate");
              // Tell the new SW to skip waiting
              newWorker.postMessage({ type: "SKIP_WAITING" });
            }
          });
        });
      })
      .catch((error) => {});
  });
}
