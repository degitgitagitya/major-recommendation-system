import { Box, Card, Divider, Grid, TextField, Typography } from '@mui/material';

interface MyResultProps {
  myRanking: {
    ci_biologi: number;
    ci_fisika: number;
    ci_kimia: number;
    ci_ilkom: number;
    ci_matematika: number;
  };
}

const MyResult: React.FC<MyResultProps> = ({ myRanking }) => {
  const sortedRanking = Object.entries(myRanking).sort((a, b) => {
    return a[1] - b[1];
  });

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant='h5'>Hasil</Typography>
      <Divider sx={{ mb: 2, mt: 1 }} />

      <Grid
        container
        sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}
      >
        <Grid item xs={12} md={2}>
          Prodi
        </Grid>
        <Grid item xs={12} md={3}>
          Ranking
        </Grid>
      </Grid>

      {Object.entries(myRanking).map(([key, value]) => (
        <Grid
          container
          key={key}
          sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}
        >
          <Grid item xs={12} md={2}>
            <Typography>
              {key === 'ci_biologi'
                ? 'Biologi'
                : key === 'ci_fisika'
                ? 'Fisika'
                : key === 'ci_kimia'
                ? 'Kimia'
                : key === 'ci_ilkom'
                ? 'Ilmu Komputer'
                : 'Matematika'}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField size='small' value={value} disabled />
          </Grid>
        </Grid>
      ))}

      <Typography variant='h5'>Rekomendasi</Typography>
      <Divider sx={{ mb: 2, mt: 1 }} />

      <Typography variant='h6'>
        {`Prodi ${
          sortedRanking[0][0] === 'ci_biologi'
            ? 'Biologi'
            : sortedRanking[0][0] === 'ci_fisika'
            ? 'Fisika'
            : sortedRanking[0][0] === 'ci_kimia'
            ? 'Kimia'
            : sortedRanking[0][0] === 'ci_ilkom'
            ? 'Ilmu Komputer'
            : 'Matematika'
        } dengan peringkat ke ${sortedRanking[0][1]}`}
      </Typography>

      <Typography variant='h6'>
        {`Prodi ${
          sortedRanking[1][0] === 'ci_biologi'
            ? 'Biologi'
            : sortedRanking[1][0] === 'ci_fisika'
            ? 'Fisika'
            : sortedRanking[1][0] === 'ci_kimia'
            ? 'Kimia'
            : sortedRanking[1][0] === 'ci_ilkom'
            ? 'Ilmu Komputer'
            : 'Matematika'
        } dengan peringkat ke ${sortedRanking[1][1]}`}
      </Typography>
    </Box>
  );
};

export default MyResult;
