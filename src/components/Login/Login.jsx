import React, { useEffect, useContext, useState } from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "firebase";
import LogoSvg from "./LogoSvg";
import { UserContext } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";
import Loading from "../Loading";
import { firebaseUiConfig, firebaseConfig } from "../../firebase-config";
import { LoginCard, LoginContainer } from "./style";

firebase.initializeApp(firebaseConfig);

const Login = () => {
  const { push } = useHistory();
  const { user, setUserInfo } = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (user) push("/home");
  }, [push, user]);

  useEffect(() => {
    const unregister = firebase.auth().onAuthStateChanged((user) => {
      if (user == null) setLoading(false);
      setUserInfo({ user });
    });
    return () => {
      unregister();
    };
  }, [setUserInfo]);

  return (
    <LoginContainer>
      <LoginCard body>
        <LogoSvg />
        {!isLoading ? (
          <StyledFirebaseAuth
            uiConfig={firebaseUiConfig}
            firebaseAuth={firebase.auth()}
          />
        ) : (
          <Loading />
        )}
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
