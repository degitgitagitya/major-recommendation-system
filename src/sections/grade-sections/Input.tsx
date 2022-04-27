import { Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

interface GradeInputProps {
  label: string;
  onChangeAverage: (average: number) => void;
}

const GradeInput: React.FC<GradeInputProps> = ({ label, onChangeAverage }) => {
  const [localGrade, setLocalGrade] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const average =
      localGrade.reduce((acc, curr) => acc + curr, 0) / localGrade.length;
    onChangeAverage(average);
  }, [localGrade]);

  return (
    <Grid
      container
      sx={{
        alignItems: 'center',
      }}
    >
      <Grid item xs={12} md={6} lg={2}>
        {label}
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <TextField
          id='outlined-basic'
          variant='outlined'
          placeholder='0'
          value={localGrade[0]}
          type='number'
          onChange={(e) => {
            const num = parseInt(e.target.value);
            setLocalGrade([
              num ? num : 0,
              localGrade[1],
              localGrade[2],
              localGrade[3],
              localGrade[4],
            ]);
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <TextField
          id='outlined-basic'
          variant='outlined'
          placeholder='0'
          value={localGrade[1]}
          type='number'
          onChange={(e) => {
            const num = parseInt(e.target.value);
            setLocalGrade([
              localGrade[0],
              num ? num : 0,
              localGrade[2],
              localGrade[3],
              localGrade[4],
            ]);
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <TextField
          id='outlined-basic'
          variant='outlined'
          placeholder='0'
          value={localGrade[2]}
          type='number'
          onChange={(e) => {
            const num = parseInt(e.target.value);
            setLocalGrade([
              localGrade[0],
              localGrade[1],
              num ? num : 0,
              localGrade[3],
              localGrade[4],
            ]);
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <TextField
          id='outlined-basic'
          variant='outlined'
          placeholder='0'
          value={localGrade[3]}
          type='number'
          onChange={(e) => {
            const num = parseInt(e.target.value);
            setLocalGrade([
              localGrade[0],
              localGrade[1],
              localGrade[2],
              num ? num : 0,
              localGrade[4],
            ]);
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <TextField
          id='outlined-basic'
          variant='outlined'
          placeholder='0'
          value={localGrade[4]}
          type='number'
          onChange={(e) => {
            const num = parseInt(e.target.value);
            setLocalGrade([
              localGrade[0],
              localGrade[1],
              localGrade[2],
              localGrade[3],
              num ? num : 0,
            ]);
          }}
        />
      </Grid>
    </Grid>
  );
};

export default GradeInput;
