import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Profile from '@/components/Profile/Profile';
import { getMe } from '@/lib/api/serverApi';
import type { User } from '@/types/user';

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

  return <Profile user={user} />;
}
