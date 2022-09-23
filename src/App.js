import "./App.css";

import React from "react";

import AppRouter from "./routes/AppRoute";

export function callNotification(cb) {
  cb();
}

function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
