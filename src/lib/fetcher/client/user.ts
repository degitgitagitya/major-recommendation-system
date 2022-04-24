import axios from 'axios';

import { resolvePromise } from '@lib/errorHandler/client';

export const getMyUser = async () => {
  const [data, error] = await resolvePromise<unknown>(
    axios.get(`/api/user/my`)
  );

  if (error) throw Error(error.detail);
  return data;
};
