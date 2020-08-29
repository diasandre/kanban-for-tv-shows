import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import Kanban from "../Kanban";
import { Header, KanbanContainer, Container } from "./style";

const Home = () => {
  const { push } = useHistory();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) push("/");
  }, [push, user]);

  return (
    <Container>
      <Header />
      <KanbanContainer>
        <Kanban />
      </KanbanContainer>
    </Container>
  );
};

export default Home;
