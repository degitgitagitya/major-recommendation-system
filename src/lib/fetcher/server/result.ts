import axios from 'axios';

import { NilaiSiswa } from './nilai';
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

export interface Result {
  id: number;
  attributes: ResultAttributes;
}

export interface ResultAttributes {
  ci_biologi: number;
  ci_fisika: number;
  ci_kimia: number;
  ci_ilkom: number;
  ci_matematika: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  nilai_siswa: {
    data: NilaiSiswa;
  };
}

export const addResult = async (payload: {
  ci_biologi: number;
  ci_fisika: number;
  ci_kimia: number;
  ci_ilkom: number;
  ci_matematika: number;
  nilai_siswa: number;
}) => {
  const [data, error] = await resolvePromise<DataWithMeta<Result>>(
    axios.post(
      `${process.env.CMS_URL}/api/results`,
      {
        data: payload,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      }
    )
  );

  if (data) return data;
  if (error) throw Error(error.detail);
  throw Error('No message from sever');
};
