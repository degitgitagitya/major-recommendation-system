import nc from 'next-connect';
import axios from 'axios';
import qs from 'qs';

import { resolvePromise } from '@lib/errorHandler/cms';
import { verifySession } from '@lib/middleware/apiMiddleware';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(verifySession)
  .get(async (req, res) => {
    const query = qs.stringify(req.query, { encodeValuesOnly: true });

    const [data, error] = await resolvePromise(
      axios.get(`${process.env.CMS_URL}/api/kriterias?${query}`, {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      })
    );

    if (error) {
      res.status(error.code).json(error);
    } else {
      res.json(data);
    }
  });

export default handler;
