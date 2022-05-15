import axios from 'axios';
import qs from 'qs';

import { resolvePromise } from '@lib/errorHandler/client';

import type { DataWithMeta, NilaiSiswa } from '../server/nilai';

interface AddGradePayload {
  name: string;
  biologi: number;
  fisika: number;
  kimia: number;
  matematika: number;
  indonesia: number;
  inggris: number;
}

export const addGrade = async (payload: AddGradePayload) => {
  const [data, error] = await resolvePromise<unknown>(
    axios.post(`/api/grade`, payload)
  );

  if (error) throw Error(error.detail);
  return data;
};

export const getMyGrade = async () => {
  const [data, error] = await resolvePromise<NilaiSiswa>(
    axios.get(`/api/grade/my`)
  );

  if (error) throw Error(error.detail);
  return data;
};

export const putGrade = async (id: number, payload: AddGradePayload) => {
  const [data, error] = await resolvePromise<unknown>(
    axios.put(`/api/grade/${id}`, payload)
  );

  if (error) throw Error(error.detail);
  return data;
};

export const getAllGrade = async (
  params: Record<string, any> | undefined = undefined
) => {
  const query = qs.stringify(params, { encodeValuesOnly: true });

  const [data, error] = await resolvePromise<DataWithMeta<NilaiSiswa[]>>(
    axios.get(`/api/grade?${query}`)
  );

  if (error) throw Error(error.detail);
  return data;
};

interface AddGradeWithUserPayload {
  name: string;
  nis: string;
  biologi: number;
  fisika: number;
  kimia: number;
  matematika: number;
  indonesia: number;
  inggris: number;
}

export const addGradeWithUser = async (payload: AddGradeWithUserPayload) => {
  const [data, error] = await resolvePromise<unknown>(
    axios.post(`/api/grade/user`, payload)
  );

  if (error) throw Error(error.detail);
  return data;
};
