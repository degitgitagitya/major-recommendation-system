import axios from 'axios';

import { resolvePromise } from '@lib/errorHandler/client';

export const normalizeData = async () => {
  const [data, error] = await resolvePromise<unknown>(
    axios.get(`/api/normalizer`)
  );

  if (error) throw Error(error.detail);
  return data;
};
