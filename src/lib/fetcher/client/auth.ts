import axios from 'axios';

import { resolvePromise } from '@lib/errorHandler/client';

export interface UserPermission {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  is_admin: boolean;
}

export interface AuthResponse {
  jwt: string;
  user: UserPermission;
}

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export const register = async (payload: RegisterPayload) => {
  const [data, error] = await resolvePromise<AuthResponse>(
    axios.post(`/api/register`, payload)
  );

  if (error) throw Error(error.detail);
  return data;
};
