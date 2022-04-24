import nc from 'next-connect';
import axios from 'axios';
import qs from 'qs';

import { resolvePromise } from '@lib/errorHandler/cms';
import { getSession } from 'next-auth/react';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const session = await getSession({ req });
  const query = qs.stringify(
    {
      populate: '*',
    },
    { encodeValuesOnly: true }
  );

  const [data, error] = await resolvePromise(
    axios.get(
      `${process.env.CMS_URL}/api/users/${session?.user.sub}?${query}`,
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
