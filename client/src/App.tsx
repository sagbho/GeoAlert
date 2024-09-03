import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
