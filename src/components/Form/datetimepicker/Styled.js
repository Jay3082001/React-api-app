import styled from "styled-components";

export const StyledDateTimePicker = styled.input`
  padding: 0.6rem 1rem;
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
`;
