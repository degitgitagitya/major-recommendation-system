import Layout from '@components/Layout';
import GradeInput from 'src/sections/grade-sections/Input';

import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useState } from 'react';
import { addGrade } from '@lib/fetcher/client/grade';

import type { NextPage } from 'next';
import useSWR from 'swr';
import { getMyUser } from '@lib/fetcher/client/user';

const Grade: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [grade, setGrade] = useState({
    biologi: 0,
    fisika: 0,
    kimia: 0,
    matematika: 0,
    indonesia: 0,
    inggris: 0,
  });

  const handleChangeAverage = useCallback(
    (average: number, key: string) => {
      setGrade((c) => ({
        ...c,
        [key]: average,
      }));
    },
    [setGrade]
  );

  const { data } = useSWR('/api/user/my', getMyUser);

  console.log(data);

  const submitGrade = async () => {
    setIsLoading(true);
    try {
      await addGrade({ ...grade, name });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Layout title='Input Nilai'>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Typography gutterBottom variant='h5'>
            Data Diri
          </Typography>
          <Divider />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography sx={{ width: 200 }}>Nama</Typography>
          <TextField
            id='outlined-basic'
            variant='outlined'
            placeholder='John Doe'
            value={name}
            onChange={(event) => setName(event.target.value as string)}
          />
        </Box>

        <Box>
          <Typography gutterBottom variant='h5'>
            Data Nilai
          </Typography>
          <Divider />
        </Box>

        <Grid container>
          <Grid item xs={12} md={6} lg={2}></Grid>
          <Grid item xs={12} md={6} lg={2}>
            Semester 1
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            Semester 2
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            Semester 3
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            Semester 4
          </Grid>
        </Grid>

        <GradeInput
          label='Nilai Biologi'
          onChangeAverage={(average) => handleChangeAverage(average, 'biologi')}
        />
        <GradeInput
          label='Nilai Fisika'
          onChangeAverage={(average) => handleChangeAverage(average, 'fisika')}
        />
        <GradeInput
          label='Nilai Kimia'
          onChangeAverage={(average) => handleChangeAverage(average, 'kimia')}
        />
        <GradeInput
          label='Nilai Matematika'
          onChangeAverage={(average) =>
            handleChangeAverage(average, 'matematika')
          }
        />
        <GradeInput
          label='Nilai Indonesia'
          onChangeAverage={(average) =>
            handleChangeAverage(average, 'indonesia')
          }
        />
        <GradeInput
          label='Nilai Inggris'
          onChangeAverage={(average) => handleChangeAverage(average, 'inggris')}
        />

        <Box>
          <Button
            disabled={isLoading}
            onClick={submitGrade}
            variant='contained'
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default Grade;
