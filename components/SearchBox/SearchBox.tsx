'use client';

import css from './SearchBox.module.css';

type SearchBoxProps = {
  action: string;
  defaultSearch?: string;
};

export default function SearchBox({ action, defaultSearch = '' }: SearchBoxProps) {
  return (
    <form className={css.form} action={action} method="get">
      <input
        className={css.input}
        type="search"
        name="search"
        defaultValue={defaultSearch}
        placeholder="Search notes"
        aria-label="Search notes"
      />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
}
