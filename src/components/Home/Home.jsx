import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../../firebase-config";
import { UserContext } from "../../contexts/UserContext";
import Kanban from "../Kanban";
import { Header, KanbanContainer, Container } from "./style";
import { Dropdown, SplitButton } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) navigate("/");
  }, [navigate, user]);

  const logout = () =>
    firebase
      .auth()
      .signOut()
      .then(() => navigate("/"));

  return (
    <Container>
      <Header>
        {user && (
          <SplitButton
            key="secondary"
            id={`dropdown-split-variants-Secondary`}
            variant="secondary"
            title={user.displayName}
          >
            <Dropdown.Item eventKey="1">Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4" onClick={logout}>
              Logout
            </Dropdown.Item>
          </SplitButton>
        )}
      </Header>
      <KanbanContainer>
        <Kanban />
      </KanbanContainer>
    </Container>
  );
};

export default Home;
