'use client';

import css from './SearchBox.module.css';

type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  inputId?: string;
};

export default function SearchBox({
  value,
  onChange,
  onSearch,
  inputId = 'notes-search',
}: SearchBoxProps) {
  return (
    <form
      className={css.form}
      onSubmit={(e) => {
        e.preventDefault();
        onSearch?.();
      }}
    >
      <label htmlFor={inputId} className={css.label}>
        Search
      </label>
      <div className={css.row}>
        <input
          id={inputId}
          className={css.input}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search notes"
          aria-label="Search notes"
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </div>
    </form>
  );
}
