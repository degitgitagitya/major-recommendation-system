import nc from 'next-connect';

import { calculateTopsisNormalize } from '@lib/helper/topsis';
import { verifySession } from '@lib/middleware/apiMiddleware';
import { deleteAllResults } from '@lib/fetcher/server/result';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(verifySession)
  .get(async (req, res) => {
    try {
      await deleteAllResults();
      await calculateTopsisNormalize();
      res.json({
        message: 'success',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  });

export default handler;
