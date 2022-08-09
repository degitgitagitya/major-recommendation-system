import nc from 'next-connect';
import axios from 'axios';

import { resolvePromise } from '@lib/errorHandler/cms';
import { getNilai } from '@lib/fetcher/server/nilai';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>().post(async (req, res) => {
  const { name, nis, biologi, fisika, kimia, matematika, indonesia, inggris, atribut } =
    req.body;

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
            nis,
            biologi,
            fisika,
            kimia,
            matematika,
            indonesia,
            inggris,
            atribut: atribut ?? `R${nextIteration}`,
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
            nis,
            biologi,
            fisika,
            kimia,
            matematika,
            indonesia,
            inggris,
            atribut: atribut ?? `R1`,
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
