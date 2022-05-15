import LayoutAdmin from '@components/LayoutAdmin';
import GradeTable from 'src/sections/input-sections/GradeTable';
import InputToolbar from 'src/sections/input-sections/InputToolbar';

import { Box } from '@mui/material';
import { useState } from 'react';

import type { NextPage } from 'next';

export interface TableState {
  pagination: {
    page: number;
    pageSize: number;
  };
}

const Dashboard: NextPage = () => {
  const [tableState, setTableState] = useState<TableState>({
    pagination: {
      page: 1,
      pageSize: 10,
    },
  });

  return (
    <LayoutAdmin title='Input Nilai'>
      <Box>
        <InputToolbar tableState={tableState} />
        <GradeTable tableState={tableState} setTableState={setTableState} />
      </Box>
    </LayoutAdmin>
  );
};

export default Dashboard;
