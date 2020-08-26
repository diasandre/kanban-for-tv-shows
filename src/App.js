import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import {
  UserContextProvider,
  defaultUserContext,
} from "./contexts/UserContext";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

function App() {
  const [userInfo, setUserInfo] = useState(defaultUserContext);
  return (
    <UserContextProvider
      value={{
        ...userInfo,
        setUserInfo,
      }}
    >
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
