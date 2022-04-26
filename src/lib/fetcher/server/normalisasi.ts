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

export interface Normalisasi {
  id: number;
  attributes: NormalisasiAttributes;
}

export interface NormalisasiAttributes {
  biologi: number;
  fisika: number;
  kimia: number;
  matematika: number;
  indonesia: number;
  inggris: number;
  bobot: number;
  hasilkali_prioritas: number;
  HK_PV: number;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
  kriteria?:
    | {
        data: {
          id: number;
          attributes: {
            name: string;
            index: number;
            createdAt: Date;
            updatedAt: Date;
            publishedAt: Date;
          };
        };
      }
    | number;
  prodi?:
    | {
        data: {
          id: number;
          attributes: {
            name: string;
            index: number;
            createdAt: Date;
            updatedAt: Date;
            publishedAt: Date;
          };
        };
      }
    | number;
}

export const addNormalized = async (payload: NormalisasiAttributes) => {
  const [data, error] = await resolvePromise<DataWithMeta<Normalisasi>>(
    axios.post(
      `${process.env.CMS_URL}/api/normalisasis`,
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

export const getNormalized = async (
  params: Record<string, any> | undefined = undefined
) => {
  const query = qs.stringify(params, { encodeValuesOnly: true });

  const [data, error] = await resolvePromise<DataWithMeta<Normalisasi[]>>(
    axios.get(`${process.env.CMS_URL}/api/normalisasis?${query}`, {
      headers: {
        Authorization: `Bearer ${process.env.CMS_TOKEN}`,
      },
    })
  );

  if (data) return data;
  if (error) throw Error(error.detail);
  throw Error('No message from sever');
};

export const deleteAllNormalized = async () => {
  const { data } = await getNormalized({
    pagination: {
      page: 1,
      pageSize: 1000,
    },
  });

  await Promise.all(
    data.map((norm) => {
      return axios.delete(
        `${process.env.CMS_URL}/api/normalisasis/${norm.id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.CMS_TOKEN}`,
          },
        }
      );
    })
  );
};
