import nc from 'next-connect';

import { calculateTopsisNormalize } from '@lib/helper/topsis';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  calculateTopsisNormalize();

  return res.json({
    status: 'success',
  });
});

export default handler;
