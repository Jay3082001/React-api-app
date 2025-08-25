import styled from "styled-components";

export const StyledSelect = styled.select`
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: white;
  min-width: 200px;
  font-size: 0.95rem;
  transition: all 0.2s ease;

  &:focus {
    border-color: #f6833bff;
    box-shadow: 0 0 6px rgba(246, 106, 59, 0.3);
    outline: none;
  }
`;
