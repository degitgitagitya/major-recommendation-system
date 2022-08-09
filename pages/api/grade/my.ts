import nc from 'next-connect';

import { getSession } from 'next-auth/react';
import { getNilai } from '@lib/fetcher/server/nilai';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const session = await getSession({ req });
  try {
    console.log(session?.user.sub)
    const { data } = await getNilai({
      populate: '*',
      pagination: {
        page: 1,
        pageSize: 100,
      },
      filters: {
        users_permissions_user: {
          id: {
            $eq: session?.user.sub,
          },
        },
      },
    });

    if (data && data.length !== 0) {
      const myDatum = data[0];
      if (myDatum) {
        res.json(myDatum);
      } else {
        res.status(200).json(null);
      }
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    res.status(404).json({
      message: 'Not found',
    });
  }
});
export default handler;
