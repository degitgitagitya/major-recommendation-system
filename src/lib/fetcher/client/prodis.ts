import axios from 'axios';
import qs from 'qs';

import { resolvePromise } from '@lib/errorHandler/client';

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination: Pagination;
}

export interface DataWithMeta<T> {
  data: T;
  meta: Meta;
}

export interface Attributes {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export interface Prodi {
  id: number;
  attributes: Attributes;
}

export const getProdis = async () => {
  const query = qs.stringify(
    {
      pagination: {
        page: 1,
        pageSize: 100,
      },
    },
    { encodeValuesOnly: true }
  );

  const [data, error] = await resolvePromise<DataWithMeta<Prodi[]>>(
    axios.get(`/api/prodi?${query}`)
  );

  if (error) throw Error(error.detail);
  return data;
};
