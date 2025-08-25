import styled from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  margin-top: 2rem;

  .pagination {
    padding: 0.4rem 1rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;
    transition: 0.2s;
    font-size: 0.9rem;

    &:hover:not(:disabled) {
      border-color: #f35525;
      color: #f35525;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
`;
