import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./css/App.css";
import "./css/index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
