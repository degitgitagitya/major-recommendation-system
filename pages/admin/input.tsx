import LayoutAdmin from '@components/LayoutAdmin';
import ParameterTable from 'src/sections/parameter-sections/ParameterTable';
import GradeTable from 'src/sections/input-sections/GradeTable';
import InputToolbar from 'src/sections/input-sections/InputToolbar';

import { Box, Typography, Divider } from '@mui/material';

import type { NextPage } from 'next';

const Dashboard: NextPage = () => {
  return (
    <LayoutAdmin title='Input Nilai'>
      <Box>
        <InputToolbar />
        <GradeTable />
      </Box>
    </LayoutAdmin>
  );
};

export default Dashboard;
