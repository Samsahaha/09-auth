import Link from 'next/link';
import css from './Pagination.module.css';

type PaginationProps = {
  page: number;
  hasNext: boolean;
  search?: string;
};

function buildQuery(nextPage: number, search?: string) {
  const params = new URLSearchParams();
  if (nextPage > 1) {
    params.set('page', String(nextPage));
  }
  if (search) {
    params.set('search', search);
  }
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export default function Pagination({ page, hasNext, search = '' }: PaginationProps) {
  const hasPrev = page > 1;
  const qPrev = buildQuery(page - 1, search);
  const qNext = buildQuery(page + 1, search);

  return (
    <nav className={css.root} aria-label="Pagination">
      {hasPrev ? (
        <Link className={css.link} href={qPrev} scroll={false}>
          Previous
        </Link>
      ) : (
        <span className={css.muted}>Previous</span>
      )}
      <span className={css.muted}>Page {page}</span>
      {hasNext ? (
        <Link className={css.link} href={qNext} scroll={false}>
          Next
        </Link>
      ) : (
        <span className={css.muted}>Next</span>
      )}
    </nav>
  );
}
