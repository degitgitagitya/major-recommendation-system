import axios from 'axios';

import { resolvePromise } from '@lib/errorHandler/client';

import type { NilaiSiswa } from '../server/nilai';

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
