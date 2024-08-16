import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
      </Switch>
    </Router>
  );
};

export default App;
