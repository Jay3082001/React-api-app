import styled, { css } from "styled-components";
import Input from "../input/Input";

export const Wrapper = styled.div`
  position: relative;
`;

export const StyledInput = styled(Input)`
  ${(props) =>
        props.variant === "usersPage" &&
        css`
            padding: 0.7rem 1rem; 
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 0.95rem;
            width: 100%;
            transition: 0.2s; 
    `}
  
  ${(props) =>
        props.variant === "AuthPage" &&
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

      &:focus {
        border-color: none;
        box-shadow: none;
        outline: none; 
      }  

      &::placeholder {
        font-weight: 500;
        color: #535252;;
        font-size: 1.1rem;
      }
    `}
`;
