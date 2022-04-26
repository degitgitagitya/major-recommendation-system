import nc from 'next-connect';

import { normalize } from '@lib/helper/normalize';
import { verifySession } from '@lib/middleware/apiMiddleware';
import { deleteAllNormalized } from '@lib/fetcher/server/normalisasi';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(verifySession)
  .get(async (req, res) => {
    try {
      await deleteAllNormalized();
      await normalize('PBiologi');
      await normalize('PFisika');
      await normalize('PIlmuKomputer');
      await normalize('PKimia');
      await normalize('PMatematika');
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
