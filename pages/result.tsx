import Layout from '@components/Layout';
import DataSection from 'src/sections/result-sections/DataSection';
import MyResult from 'src/sections/result-sections/MyResult';

import { GridColDef } from '@mui/x-data-grid';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { ExpandMore } from '@mui/icons-material';

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
  const [myRanking, setMyRanking] = useState({
    ci_biologi: 0,
    ci_fisika: 0,
    ci_kimia: 0,
    ci_ilkom: 0,
    ci_matematika: 0,
  });

  const updateRanking = (
    key: 'ci_biologi' | 'ci_fisika' | 'ci_kimia' | 'ci_ilkom' | 'ci_matematika',
    value: number
  ) => {
    setMyRanking((c) => ({ ...c, [key]: value + 1 }));
  };

  return (
    <Layout title='Hasil'>
      <Box>
        <MyResult myRanking={myRanking} />

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography variant='h4'>Hasil Keseluruhan</Typography>
          </AccordionSummary>
          <AccordionDetails>
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
          </AccordionDetails>
        </Accordion>
      </Box>
    </Layout>
  );
};

export default Result;
