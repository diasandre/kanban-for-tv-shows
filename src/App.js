import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
          <Routes>
            <Route exact path="/" element={<Login />}/>
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;