import nc from 'next-connect';
import axios from 'axios';

import { resolvePromise } from '@lib/errorHandler/cms';
import { getNilai } from '@lib/fetcher/server/nilai';

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
  const {
    name,
    email,
    nis,
    biologi,
    fisika,
    kimia,
    matematika,
    indonesia,
    inggris,
  } = req.body;

  const [userData] = await resolvePromise<RegisterUser>(
    axios.post(`${process.env.CMS_URL}/api/auth/local/register`, {
      username: nis,
      email,
      password: nis,
    })
  );

  const { data: siswas } = await getNilai({
    sort: ['id:desc'],
    pagination: {
      page: 1,
      pageSize: 100,
    },
  });

  const siswa = siswas[0];

  if (siswa) {
    const iteration = siswa.attributes.atribut.replace('R', '');
    const intIteration = parseInt(iteration);
    const nextIteration = intIteration + 1;
    const [data, error] = await resolvePromise(
      axios.post(
        `${process.env.CMS_URL}/api/nilai-siswas`,
        {
          data: {
            name,
            biologi,
            fisika,
            kimia,
            matematika,
            indonesia,
            inggris,
            atribut: `R${nextIteration}`,
            users_permissions_user: userData?.user.id,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CMS_TOKEN}`,
          },
        }
      )
    );
    if (error) {
      res.status(error.code).json(error);
    } else {
      res.json(data);
    }
  } else {
    const [data, error] = await resolvePromise(
      axios.post(
        `${process.env.CMS_URL}/api/nilai-siswas`,
        {
          data: {
            name,
            biologi,
            fisika,
            kimia,
            matematika,
            indonesia,
            inggris,
            atribut: `R1`,
            users_permissions_user: userData?.user.id,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CMS_TOKEN}`,
          },
        }
      )
    );
    if (error) {
      res.status(error.code).json(error);
    } else {
      res.json(data);
    }
  }
});

export default handler;
