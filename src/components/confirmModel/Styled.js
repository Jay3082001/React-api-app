import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 20%;
  right: 30%;
  background-color: #eeb969;
  border: 1px solid orange;
  padding: 16px;
  border-radius: 8px;
  z-index: 1000;
  min-width: 280px;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;
