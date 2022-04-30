import nc from 'next-connect';
import axios from 'axios';

import { resolvePromise } from '@lib/errorHandler/cms';
import { getSession } from 'next-auth/react';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>().put(async (req, res) => {
  const session = await getSession({ req });

  const { id } = req.query;

  const [data, error] = await resolvePromise(
    axios.put(
      `${process.env.CMS_URL}/api/nilai-siswas/${id}`,
      {
        data: {
          ...req.body,
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
});

export default handler;
