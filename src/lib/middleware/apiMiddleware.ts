import { getSession } from 'next-auth/react';

import type { NextHandler } from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * @param  {NextApiRequest} req
 * @param  {NextApiResponse} res
 * @param  {NextHandler} next
 */
export const verifySession = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const session = await getSession({ req });

  if (session) {
    next();
    return;
  }
  res.status(403).json({
    code: 403,
    detail: 'Forbidden',
  });
};
