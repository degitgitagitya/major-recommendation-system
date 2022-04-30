import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import { Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';

const AlreadyExist: React.FC = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography>
        Nilai telah dimasukan, klik tombol hasil untuk melihat detail atau klik
        tombol edit untuk mengubah
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          onClick={() => router.push('/result')}
          variant='contained'
          startIcon={<VisibilityIcon />}
        >
          Hasil
        </Button>

        <Button
          onClick={() => router.push('/grade?edit=true')}
          variant='outlined'
          startIcon={<EditIcon />}
        >
          Masukkan Ulang
        </Button>
      </Box>
    </Box>
  );
};

export default AlreadyExist;
