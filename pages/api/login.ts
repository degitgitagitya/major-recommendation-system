import nc from 'next-connect';
import axios from 'axios';

import { resolvePromise } from '@lib/errorHandler/cms';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>().post(async (req, res) => {
  const { identifier, password } = req.body;

  const [data, error] = await resolvePromise(
    axios.post(`${process.env.CMS_URL}/api/auth/local`, {
      identifier,
      password,
    })
  );

  if (error) {
    res.status(error.code).json(error);
  } else {
    res.json(data);
  }
});

export default handler;
