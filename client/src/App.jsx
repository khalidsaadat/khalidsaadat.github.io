import React from "react";

import "./static/css/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RegularRoutes from "./routes/generalRoutes";
import AuthRoutes from "./routes/authRoutes";

function App() {
  return (
    <Router>
      <RegularRoutes />
      <AuthRoutes />
    </Router>
  );
}

export default App;