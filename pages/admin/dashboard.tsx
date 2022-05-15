import LayoutAdmin from '@components/LayoutAdmin';
import qs from 'qs';
import useSWR from 'swr';

import { getAllGrade } from '@lib/fetcher/client/grade';

import { Box, Card, Typography } from '@mui/material';

import type { NextPage } from 'next';

const Dashboard: NextPage = () => {
  const tableState = {
    pagination: {
      page: 1,
      pageSize: 10,
    },
  };

  const { data } = useSWR(
    () => {
      const query = qs.stringify(tableState, { encodeValuesOnly: true });
      return `/api/grade?${query}`;
    },
    () => getAllGrade(tableState)
  );

  return (
    <LayoutAdmin title='Admin Dashboard'>
      <Box sx={{ display: 'flex' }}>
        <Card
          variant='outlined'
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant='h6' gutterBottom sx={{ textAlign: 'center' }}>
            Jumlah Siswa
          </Typography>

          <Typography
            variant='h4'
            gutterBottom
            sx={{ textAlign: 'center' }}
            color='secondary'
          >
            {data?.meta.pagination.total}
          </Typography>
        </Card>
      </Box>
    </LayoutAdmin>
  );
};

export default Dashboard;
