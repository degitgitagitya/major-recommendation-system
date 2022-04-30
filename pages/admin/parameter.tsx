import LayoutAdmin from '@components/LayoutAdmin';
import ParameterTable from 'src/sections/parameter-sections/ParameterTable';
import useSWR from 'swr';

import { getKriterias } from '@lib/fetcher/client/kriteria';
import { Box, Typography, Divider } from '@mui/material';
import { getProdis } from '@lib/fetcher/client/prodis';

import type { NextPage } from 'next';

const Dashboard: NextPage = () => {
  const { data: kriterias } = useSWR(`/api/kriteria`, getKriterias);
  const { data: prodis } = useSWR(`/api/prodi`, getProdis);

  return (
    <LayoutAdmin title='Parameter'>
      <Box>
        <Typography variant='h5'>Masukkan Parameter Prodi Biologi</Typography>
        <Divider sx={{ mb: 2, mt: 1 }} />
        <ParameterTable />
      </Box>
    </LayoutAdmin>
  );
};

export default Dashboard;
