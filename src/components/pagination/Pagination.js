import Button from "../Form/button/Button";
import { PaginationWrapper } from "./styled";

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <PaginationWrapper>
      <Button
        className="pagination"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1} variant="dark">
        ← Prev
      </Button>

      <span>
        Page {page} of {totalPages}
      </span>

      <Button
        className="pagination"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages} variant="dark">
        Next →
      </Button>
    </PaginationWrapper>
  );
};

export default Pagination;
