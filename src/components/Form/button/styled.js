import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.3s ease;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  justify-content: center; 
  gap: 0.4rem;

  ${(props) =>
    props.variant === "primary" &&
    css`
      color: white; 
      background: linear-gradient(135deg, #f35525, #ec410e);

      &:hover {
        background: linear-gradient(135deg, #a5320f, #f35525);
      }
    `}
  
  ${(props) =>
    props.variant === "dark" &&
    css`
      color: black;
      background: linear-gradient(135deg, #f35525, #ec410e);

      &:hover {
        background: linear-gradient(135deg, #a5320f, #f35525);
      }
    `}  

  ${(props) =>
    props.variant === "danger" &&
    css`
      color: white;
      background: linear-gradient(135deg, #ef4444, #b91c1c);

      &:hover {
        background: linear-gradient(135deg, #b91c1c, #7f1d1d);
      }
    `}

  ${(props) =>
    props.variant === "icon" &&
    css`
      background: transparent;
      color: #f35525;
      font-size: 1rem;
      padding: 0.4rem 0.6rem;
      border: 1px solid #e99074;

      &:hover {
        background: rgba(246, 149, 59, 0.1);
      }
    `}

  ${(props) =>
    props.variant === "AuthButton" &&
    css`
      width: 150px; 
      height: 49px;
      border: none;
      outline: none;
      border-radius: 49px;
      cursor: pointer;
      background: linear-gradient(#ae5b12, #b9741aff);
      color: white;
      text-transform: uppercase;
      font-weight: 600;
      margin: 10px 0;
      transition: all 0.3s ease-in-out;

      &:hover {
        background: linear-gradient( #955b0fff ,#ae5b12);
      }
    `}  
`;
