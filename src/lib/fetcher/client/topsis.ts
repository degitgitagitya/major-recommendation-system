import axios from 'axios';

import { resolvePromise } from '@lib/errorHandler/client';

export const processTopsis = async () => {
  const [data, error] = await resolvePromise<unknown>(axios.get(`/api/topsis`));

  if (error) throw Error(error.detail);
  return data;
};
