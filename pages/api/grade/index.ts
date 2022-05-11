import nc from 'next-connect';
import axios from 'axios';

import { resolvePromise } from '@lib/errorHandler/cms';
import { getSession } from 'next-auth/react';
import { getNilai } from '@lib/fetcher/server/nilai';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>()
  .post(async (req, res) => {
    const session = await getSession({ req });

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
              ...req.body,
              atribut: `R${nextIteration}`,
              users_permissions_user: session?.user.sub,
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
              ...req.body,
              atribut: `R1`,
              users_permissions_user: session?.user.sub,
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
  })
  .get(async (req, res) => {
    const params = req.query;

    const data = await getNilai(params);

    res.json(data);
  });

export default handler;
