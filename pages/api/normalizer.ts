import nc from 'next-connect';

import { normalize } from '@lib/helper/normalize';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const normalizedBiologi = await normalize('PBiologi');
  const normalizedFisika = await normalize('PFisika');
  const normalizedIlmuKomputer = await normalize('PIlmuKomputer');
  const normalizedKimia = await normalize('PKimia');
  const normalizedMatematika = await normalize('PMatematika');

  return res.json({
    status: 'success',
  });
});

export default handler;
