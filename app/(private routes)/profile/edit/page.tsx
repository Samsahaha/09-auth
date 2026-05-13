'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import Loader from '@/components/Loader/Loader';
import type { User } from '@/types/user';
import css from './EditProfilePage.module.css';

function EditProfileForm({ initialUser }: { initialUser: User }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);
  const [username, setUsername] = useState(initialUser.username);

  const mutation = useMutation({
    mutationFn: (nextUsername: string) => updateMe({ username: nextUsername }),
    onSuccess: (user) => {
      setUser(user);
      queryClient.setQueryData(['me'], user);
      router.push('/profile');
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate(username.trim());
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={initialUser.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <p>Email: {initialUser.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton} disabled={mutation.isPending}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push('/profile')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default function EditProfilePage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });

  if (isPending || !data) {
    return <Loader />;
  }

  if (isError) {
    return (
      <main className={css.mainContent}>
        <p>Unable to load profile.</p>
      </main>
    );
  }

  return <EditProfileForm key={data.email} initialUser={data} />;
}
