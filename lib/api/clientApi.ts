import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import { api } from './api';

export interface RegisterCredentials {
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export async function register(credentials: RegisterCredentials): Promise<User> {
  const { data } = await api.post<User>('/auth/register', credentials);
  return data;
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const { data } = await api.post<User>('/auth/login', credentials);
  return data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function checkSession(): Promise<boolean> {
  const { data } = await api.get<{ success: boolean }>('/auth/session');
  return data.success;
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>('/users/me');
  return data;
}

export async function updateMe(body: Partial<Pick<User, 'username'>>): Promise<User> {
  const { data } = await api.patch<User>('/users/me', body);
  return data;
}

export interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

export async function fetchNotes(params: FetchNotesParams = {}): Promise<Note[]> {
  const { data } = await api.get<Note[]>('/notes', {
    params: {
      ...params,
      perPage: params.perPage ?? 12,
    },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const { data } = await api.post<Note>('/notes', payload);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}
