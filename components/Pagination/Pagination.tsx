import css from './Pagination.module.css';

type PaginationProps = {
  page: number;
  hasNext: boolean;
  onPageChange: (nextPage: number) => void;
};

export default function Pagination({ page, hasNext, onPageChange }: PaginationProps) {
  const hasPrev = page > 1;

  return (
    <nav className={css.root} aria-label="Pagination">
      <button
        type="button"
        className={css.button}
        disabled={!hasPrev}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>
      <span className={css.muted}>Page {page}</span>
      <button
        type="button"
        className={css.button}
        disabled={!hasNext}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </nav>
  );
}
