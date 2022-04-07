import nc from 'next-connect';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  return res.json({
    message: 'Hello world',
  });
});

export default handler;
