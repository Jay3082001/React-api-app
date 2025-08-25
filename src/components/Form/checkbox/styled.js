import styled from "styled-components";

export const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #ccc;
  border-radius: 4px;
  display: inline-block;
  position: relative; 
  cursor: pointer;
  transition: all 0.2s ease;

  &:checked {
    background-color: #f35525;
    border-color: #f35525;
  }

  &:checked::after {
    content: "✓";
    color: white;
    position: absolute;
    top: 0;
    left: 3px;
    font-size: 14px;
    line-height: 18px;
  }

  &:hover {
    border-color: #f35525;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
