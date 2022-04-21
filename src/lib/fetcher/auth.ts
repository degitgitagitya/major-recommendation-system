import qs from 'qs';
import axios from 'axios';

import { resolvePromise } from '@lib/errorHandler/cms';
import { DataWithMeta } from './kriteria';
import { NilaiSiswa } from './nilai';

export const authorize = async (
  email: string | undefined,
  password: string | undefined
) => {
  const query = qs.stringify(
    {
      filters: {
        email: {
          $eq: email,
        },
        password: {
          $eq: password,
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const [data, error] = await resolvePromise<DataWithMeta<NilaiSiswa[]>>(
    axios.get(`${process.env.CMS_URL}/api/nilai-siswas?${query}`, {
      headers: {
        Authorization: `Bearer ${process.env.CMS_TOKEN}`,
      },
    })
  );

  if (error) throw Error(error.detail);
  return data;
};
