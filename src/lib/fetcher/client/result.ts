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
  ci_biologi: number;
  ci_fisika: number;
  ci_kimia: number;
  ci_ilkom: number;
  ci_matematika: number;
  nilai_siswa: DataWithMeta<NilaiSiswa>;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export interface Result {
  id: number;
  attributes: Attributes;
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
}

export interface NilaiSiswa {
  id: number;
  attributes: NilaiSiswaAttributes;
}

export const getAllResults = async (
  params: Record<string, any> | undefined = undefined
) => {
  const query = qs.stringify(params, { encodeValuesOnly: true });

  const [data, error] = await resolvePromise<DataWithMeta<Result[]>>(
    axios.get(`/api/result?${query}`)
  );

  if (error) throw Error(error.detail);
  return data;
};
