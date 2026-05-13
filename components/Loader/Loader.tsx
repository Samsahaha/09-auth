import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loader} role="status" aria-live="polite" aria-busy="true">
      <div className={css.spinner} />
    </div>
  );
}
