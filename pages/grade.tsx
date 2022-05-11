import Layout from '@components/Layout';
import GradeInput from 'src/sections/grade-sections/Input';
import AlreadyExist from 'src/sections/grade-sections/AlreadyExist';
import useSWR from 'swr';
import SuccessDialog from '@components/SuccessDialog';

import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useState } from 'react';
import { addGrade, getMyGrade, putGrade } from '@lib/fetcher/client/grade';
import { normalizeData } from '@lib/fetcher/client/normalizer';
import { processTopsis } from '@lib/fetcher/client/topsis';
import { useRouter } from 'next/router';

import type { NextPage } from 'next';

const Grade: NextPage = () => {
  const router = useRouter();

  const { edit } = router.query;
  const editFlag = edit ? Boolean(edit) : false;

  const [open, setOpen] = useState(false);
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

  const { data, mutate } = useSWR('/api/grade/my', getMyGrade, {
    onError: (error) => {
      console.log(error);
    },
  });

  const submitGrade = async () => {
    setIsLoading(true);
    try {
      await addGrade({ ...grade, name });
      await normalizeData();
      await processTopsis();
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const editGrade = async () => {
    setIsLoading(true);
    if (data) {
      try {
        await putGrade(data.id, {
          ...grade,
          name: data.attributes.name,
        });
        await normalizeData();
        await processTopsis();
        setOpen(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('no data');
    }
    setIsLoading(false);
  };

  const toggleDialog = (open: boolean) => {
    setOpen(open);
    editFlag && router.push('/grade');
  };

  if (data === undefined) {
    return (
      <Layout title='Input Nilai'>
        <Typography variant='h5'>Loading..</Typography>
      </Layout>
    );
  }

  return (
    <>
      <SuccessDialog
        open={open}
        setOpen={toggleDialog}
        callback={mutate}
        title='Data Submitted'
      />

      <Layout title='Input Nilai'>
        {data && !editFlag ? (
          <AlreadyExist />
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {!editFlag && (
              <>
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
              </>
            )}

            <Box>
              <Typography gutterBottom variant='h5'>
                {editFlag ? 'Masukkan Ulang Nilai' : 'Data Nilai'}
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
              <Grid item xs={12} md={6} lg={2}>
                Semester 5
              </Grid>
            </Grid>

            <GradeInput
              label='Nilai Biologi'
              onChangeAverage={(average) =>
                handleChangeAverage(average, 'biologi')
              }
            />
            <GradeInput
              label='Nilai Fisika'
              onChangeAverage={(average) =>
                handleChangeAverage(average, 'fisika')
              }
            />
            <GradeInput
              label='Nilai Kimia'
              onChangeAverage={(average) =>
                handleChangeAverage(average, 'kimia')
              }
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
              onChangeAverage={(average) =>
                handleChangeAverage(average, 'inggris')
              }
            />

            <Box>
              <Button
                disabled={isLoading}
                onClick={editFlag ? editGrade : submitGrade}
                variant='contained'
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        )}
      </Layout>
    </>
  );
};

export default Grade;
