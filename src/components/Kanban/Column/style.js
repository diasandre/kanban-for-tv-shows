import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  min-width: 20%;
  background-color: #e8e8e8;
`;

export const Title = styled.h3`
  padding: 8px;
  margin-bottom: 0;
  padding-bottom: 0;
`;

export const List = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-heigth: 100px;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? "lightgray" : "#e8e8e8"};
`;
