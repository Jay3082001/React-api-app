import styled, { css } from "styled-components";

export const StyledInput = styled.input`
  padding: 0.7rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.95rem;
  width: 100%;
  transition: 0.2s;   

  &:focus {
    border-color: #f6833bff;
    box-shadow: 0 0 6px rgba(246, 106, 59, 0.3);
    outline: none; 
  }

  ${(props) =>
    props.variant === "primaryInput" &&
    css`
      background: none;
      outline: none;
      border: none;
      height: 55px;
      margin-bottom: 0;
      line-height: 1;
      font-weight: 600;
      font-size: 1.1rem;
      color: #333;
      padding: 0;

      &::placeholder {
        font-weight: 500;
        color: #535252;;
        font-size: 1.1rem;
      }
    `}
`;
