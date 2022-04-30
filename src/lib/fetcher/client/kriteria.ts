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
  index: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export interface Kriteria {
  id: number;
  attributes: Attributes;
}

export const getKriterias = async () => {
  const query = qs.stringify(
    {
      pagination: {
        page: 1,
        pageSize: 100,
      },
      sort: ['index:asc'],
    },
    { encodeValuesOnly: true }
  );

  const [data, error] = await resolvePromise<DataWithMeta<Kriteria[]>>(
    axios.get(`/api/kriteria?${query}`)
  );

  if (error) throw Error(error.detail);
  return data;
};
