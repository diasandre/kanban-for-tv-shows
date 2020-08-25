import React, { useEffect, useContext } from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "firebase";
import "./Login.css";
import { Card } from "react-bootstrap";
import LogoSvg from "./LogoSvg";
import { UserContext } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";
import Loading from "../Loading";
import { firebaseUiConfig, firebaseConfig } from "../../firebase-config";

firebase.initializeApp(firebaseConfig);

const Login = () => {
  const { push } = useHistory();
  const { isLoading, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    !isLoading ? push("/home") : push("/");
  }, [push, isLoading]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUserInfo({ user });
    });
  }, [setUserInfo]);

  return (
    <div className="login-container">
      <Card body className="login-card">
        <LogoSvg />
        {!isLoading ? (
          <StyledFirebaseAuth
            uiConfig={firebaseUiConfig}
            firebaseAuth={firebase.auth()}
          />
        ) : (
          <Loading />
        )}
      </Card>
    </div>
  );
};

export default Login;
