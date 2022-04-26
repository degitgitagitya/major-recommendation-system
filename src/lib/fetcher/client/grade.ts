import axios from 'axios';

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
  const [data, error] = await resolvePromise<DataWithMeta<NilaiSiswa[]>>(
    axios.get(`/api/grade/my`)
  );

  if (error) throw Error(error.detail);
  return data;
};
