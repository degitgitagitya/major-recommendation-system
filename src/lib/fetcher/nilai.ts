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

export interface NilaiSiswa {
  id: number;
  attributes: NilaiSiswaAttributes;
}

export interface NilaiSiswaAttributes {
  name: string;
  biologi: number;
  fisika: number;
  kimia: number;
  matematika: number;
  indonesia: number;
  inggris: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  atribut: string;
  email: string;
}

export const getNilai = async (
  params: Record<string, any> | undefined = undefined
) => {
  const query = qs.stringify(params, { encodeValuesOnly: true });

  const [data, error] = await resolvePromise<DataWithMeta<NilaiSiswa[]>>(
    axios.get(`${process.env.CMS_URL}/api/nilai-siswas?${query}`, {
      headers: {
        Authorization: `Bearer ${process.env.CMS_TOKEN}`,
      },
    })
  );

  if (data) return data;
  if (error) throw Error(error.detail);
  throw Error('No message from sever');
};
