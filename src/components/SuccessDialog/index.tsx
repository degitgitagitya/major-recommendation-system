import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface SuccessDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  callback: () => void;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({
  open,
  setOpen,
  callback,
}) => {
  const handleClose = () => {
    setOpen(false);
    callback();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='registration-success-dialog-title'
      aria-describedby='registration-success-dialog-description'
    >
      <DialogTitle id='registration-success-dialog-title'>
        {'Success'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='registration-success-dialog-description'>
          Registration successful!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;
