import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const BackdropLoading: React.FC = () => {
  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: '#fff' }}
      open={true}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};

export default BackdropLoading;
