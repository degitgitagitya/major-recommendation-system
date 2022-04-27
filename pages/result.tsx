import Layout from '@components/Layout';
import DataSection from 'src/sections/result-sections/DataSection';

import { GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';

import type { Result } from '@lib/fetcher/client/result';
import type { NextPage } from 'next';

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

const Result: NextPage = () => {
  return (
    <Layout title='Hasil'>
      <Box>
        <DataSection
          columns={columns}
          identifier='ci_biologi'
          title='Biologi'
        />

        <DataSection columns={columns} identifier='ci_fisika' title='Fisika' />

        <DataSection columns={columns} identifier='ci_kimia' title='Kimia' />

        <DataSection
          columns={columns}
          identifier='ci_ilkom'
          title='Ilmu Komputer'
        />

        <DataSection
          columns={columns}
          identifier='ci_matematika'
          title='Matematika'
        />
      </Box>
    </Layout>
  );
};

export default Result;
