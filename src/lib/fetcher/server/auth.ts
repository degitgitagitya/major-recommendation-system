import axios from 'axios';

import { AuthResponse } from '../client/auth';
import { resolvePromise } from '@lib/errorHandler/cms';

interface LoginPayload {
  identifier: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  const [data, error] = await resolvePromise<AuthResponse>(
    axios.post(`${process.env.CMS_URL}/api/auth/local`, payload)
  );

  if (error) throw Error(error.detail);
  return data;
};
