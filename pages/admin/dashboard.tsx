import LayoutAdmin from '@components/LayoutAdmin';
import qs from 'qs';
import useSWR from 'swr';
import DataSection from 'src/sections/result-sections/DataSection';

import { useState } from 'react';
import { getAllGrade } from '@lib/fetcher/client/grade';
import { Box, Card, Typography } from '@mui/material';

import type { NextPage } from 'next';
import type { Result } from '@lib/fetcher/client/result';
import type { GridColDef } from '@mui/x-data-grid';

const columns: GridColDef<Result>[] = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'ranking',
    headerName: 'Ranking',
    // @ts-ignore
    valueGetter: (params) => params.row.attributes.ranking,
    width: 150,
  },
  {
    field: 'name',
    headerName: 'Nama Siswa',
    valueGetter: (params) =>
      params.row.attributes.nilai_siswa.data.attributes.name,
    width: 150,
  },
  {
    field: 'atribut',
    headerName: 'Atribut',
    valueGetter: (params) =>
      params.row.attributes.nilai_siswa.data.attributes.atribut,
    width: 150,
  },
];

const Dashboard: NextPage = () => {
  const [myRanking, setMyRanking] = useState({
    ci_biologi: 0,
    ci_fisika: 0,
    ci_kimia: 0,
    ci_ilkom: 0,
    ci_matematika: 0,
  });

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

  const updateRanking = (
    key: 'ci_biologi' | 'ci_fisika' | 'ci_kimia' | 'ci_ilkom' | 'ci_matematika',
    value: number
  ) => {
    setMyRanking((c) => ({ ...c, [key]: value + 1 }));
  };

  return (
    <LayoutAdmin title='Admin Dashboard'>
      <>
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

        <Typography sx={{ mt: 3 }} variant='h4'>
          Hasil Keseluruhan
        </Typography>

        <hr />

        <DataSection
          columns={columns}
          identifier='ci_biologi'
          title='Prodi Biologi'
          updateRanking={updateRanking}
        />

        <DataSection
          columns={columns}
          identifier='ci_fisika'
          title='Prodi Fisika'
          updateRanking={updateRanking}
        />

        <DataSection
          columns={columns}
          identifier='ci_kimia'
          title='Prodi Kimia'
          updateRanking={updateRanking}
        />

        <DataSection
          columns={columns}
          identifier='ci_ilkom'
          title='Prodi Ilmu Komputer'
          updateRanking={updateRanking}
        />

        <DataSection
          columns={columns}
          identifier='ci_matematika'
          title='Prodi Matematika'
          updateRanking={updateRanking}
        />
      </>
    </LayoutAdmin>
  );
};

export default Dashboard;
