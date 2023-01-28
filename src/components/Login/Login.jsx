import React, { useEffect, useContext, useState } from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "../../firebase-config";
import LogoSvg from "./LogoSvg";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { firebaseUiConfig, firebaseConfig } from "../../firebase-config";
import { LoginCard, LoginContainer } from "./style";
import { getOrCreate } from "../../services/userService";

firebase.initializeApp(firebaseConfig);

const Login = () => {
  const navigate = useNavigate();
  const { user, setUserInfo } = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (user) navigate("/home");
  }, [navigate, user]);

  useEffect(() => {
    const unregister = firebase.auth().onAuthStateChanged(({_delegate: user}) => {
      if (user == null) setLoading(false);
      getOrCreate(user)
        .then(({ data }) => {
          setUserInfo({ user: { ...data, ...user, token: user.getIdToken } });
        })
        .catch((e) => console.error(e));
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
