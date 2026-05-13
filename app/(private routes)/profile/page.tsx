import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getMe } from '@/lib/api/serverApi';
import type { User } from '@/types/user';
import css from '@/components/Profile/Profile.module.css';

export const metadata: Metadata = {
  title: 'Profile | Notehub',
  description: 'View your Notehub profile, username, email, and avatar.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Profile | Notehub',
    description: 'View your Notehub profile.',
  },
};

export default async function ProfilePage() {
  let user: User;

  try {
    user = await getMe();
  } catch {
    redirect('/sign-in');
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
