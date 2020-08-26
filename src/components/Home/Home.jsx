import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import "./Home.css";

const Home = () => {
  const { push } = useHistory();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) push("/");
  }, [push, user]);

  return <div className="header-home" />;
};

export default Home;
