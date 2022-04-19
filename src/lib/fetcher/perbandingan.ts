import axios from 'axios';
import qs from 'qs';

import { resolvePromise } from '@lib/errorHandler/cms';
import { Kriteria } from './kriteria';

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

export interface Prodi {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface Perbandingan {
  id: number;
  attributes: PerbandinganAttributes;
}

export interface PerbandinganAttributes {
  biologi: number;
  fisika: number;
  kimia: number;
  matematika: number;
  indonesia: number;
  inggris: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  kriteria: DataWithMeta<Kriteria>;
  prodi: DataWithMeta<Prodi>;
}

export const getPerbandingan = async (
  params: Record<string, any> | undefined = undefined
) => {
  const query = qs.stringify(params, { encodeValuesOnly: true });

  const [data, error] = await resolvePromise<DataWithMeta<Perbandingan[]>>(
    axios.get(`${process.env.CMS_URL}/api/perbandingan-berpasangans?${query}`, {
      headers: {
        Authorization: `Bearer ${process.env.CMS_TOKEN}`,
      },
    })
  );

  if (data) return data;
  if (error) throw Error(error.detail);
  throw Error('No message from sever');
};
