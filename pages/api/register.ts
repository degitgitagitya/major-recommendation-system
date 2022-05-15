import nc from 'next-connect';
import axios from 'axios';

import { resolvePromise } from '@lib/errorHandler/cms';
import { appendUserToNilai, getNilai } from '@lib/fetcher/server/nilai';

import type { NextApiRequest, NextApiResponse } from 'next';

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  is_admin: boolean;
}

export interface RegisterUser {
  jwt: string;
  user: User;
}

const handler = nc<NextApiRequest, NextApiResponse>().post(async (req, res) => {
  const { nis, email, password } = req.body;

  const dataSiswa = await getNilai({
    filters: {
      nis: {
        $eq: nis,
      },
    },
  });

  if (dataSiswa) {
    const siswa = dataSiswa.data[0];

    if (siswa) {
      const [data, error] = await resolvePromise<RegisterUser>(
        axios.post(`${process.env.CMS_URL}/api/auth/local/register`, {
          username: nis,
          email,
          password,
        })
      );

      await appendUserToNilai(siswa.id, data?.user.id);

      if (error) {
        res.status(error.code).json(error);
      } else {
        res.json(data);
      }
    } else {
      res.status(404).json({
        code: 404,
        detail: 'Data tidak ditemukan',
      });
    }
  } else {
    res.status(404).json({
      code: 404,
      detail: 'Data tidak ditemukan',
    });
  }
});

export default handler;
