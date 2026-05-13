import type { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import { api } from './api';

async function cookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');
}

export async function fetchNotes(
  params: {
    search?: string;
    page?: number;
    perPage?: number;
    tag?: string;
  } = {}
): Promise<Note[]> {
  const { data } = await api.get<Note[]>('/notes', {
    params: {
      ...params,
      perPage: params.perPage ?? 12,
    },
    headers: {
      Cookie: await cookieHeader(),
    },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: await cookieHeader(),
    },
  });
  return data;
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>('/users/me', {
    headers: {
      Cookie: await cookieHeader(),
    },
  });
  return data;
}

export async function checkSession(): Promise<AxiosResponse<{ success: boolean }>> {
  return api.get<{ success: boolean }>('/auth/session', {
    headers: {
      Cookie: await cookieHeader(),
    },
  });
}
