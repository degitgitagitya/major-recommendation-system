import axios from 'axios';
import qs from 'qs';

import { resolvePromise } from '@lib/errorHandler/cms';

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

export interface Kriteria {
  id: number;
  attributes: KriteriaAttributes;
}

export interface KriteriaAttributes {
  name: string;
  index: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export const getKriteria = async (
  params: Record<string, any> | undefined = undefined
) => {
  const query = qs.stringify(params, { encodeValuesOnly: true });

  const [data, error] = await resolvePromise<DataWithMeta<Kriteria[]>>(
    axios.get(`${process.env.CMS_URL}/api/kriterias?${query}`, {
      headers: {
        Authorization: `Bearer ${process.env.CMS_TOKEN}`,
      },
    })
  );

  if (data) return data;
  if (error) throw Error(error.detail);
  throw Error('No message from sever');
};
