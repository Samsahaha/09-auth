import Link from 'next/link';
import AuthNavigation from '@/components/AuthNavigation/AuthNavigation';
import { NOTES_LIST_PATH } from '@/lib/constants/noteTags';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.inner}>
        <Link href="/" className={css.logo}>
          Notehub
        </Link>
        <nav>
          <ul className={css.list}>
            <li className={css.navigationItem}>
              <Link href={NOTES_LIST_PATH} className={css.navLink}>
                Notes
              </Link>
            </li>
            <AuthNavigation />
          </ul>
        </nav>
      </div>
    </header>
  );
}
