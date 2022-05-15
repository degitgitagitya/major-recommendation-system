import * as React from 'react';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import qs from 'qs';

import { Add } from '@mui/icons-material';
import { useFormik } from 'formik';
import { TextField } from '@mui/material';
import { addGradeWithUser } from '@lib/fetcher/client/grade';
import { normalizeData } from '@lib/fetcher/client/normalizer';
import { processTopsis } from '@lib/fetcher/client/topsis';
import { useSWRConfig } from 'swr';

import type { TableState } from '@pages/admin/input';

interface AddGradeModalProps {
  tableState: TableState;
}

const AddGradeModal: React.FC<AddGradeModalProps> = ({ tableState }) => {
  const { mutate } = useSWRConfig();

  const [open, setOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      nis: '',
      biologi: 0,
      fisika: 0,
      kimia: 0,
      matematika: 0,
      indonesia: 0,
      inggris: 0,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Required'),
      nis: Yup.string().required('Required'),
      biologi: Yup.number().required('Required'),
      fisika: Yup.number().required('Required'),
      kimia: Yup.number().required('Required'),
      matematika: Yup.number().required('Required'),
      indonesia: Yup.number().required('Required'),
      inggris: Yup.number().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await addGradeWithUser(values);
        await normalizeData();
        await processTopsis();
        const query = qs.stringify(tableState, { encodeValuesOnly: true });
        mutate(`/api/grade?${query}`);
        setOpen(false);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button startIcon={<Add />} variant='contained' onClick={handleClickOpen}>
        Tambahkan Siswa
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='add-grade-title'
        aria-describedby='add-grade-description'
        fullWidth
      >
        <form noValidate onSubmit={formik.handleSubmit}>
          <DialogTitle id='add-grade-title'>
            {'Tambahkan Siswa Baru'}
          </DialogTitle>

          <DialogContent>
            <TextField
              label='Nama'
              type='text'
              variant='standard'
              fullWidth
              name='name'
              id='name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={
                formik.touched.name
                  ? formik.errors.name
                    ? formik.errors.name
                    : ' '
                  : ' '
              }
            />

            <TextField
              label='NIS'
              type='text'
              variant='standard'
              fullWidth
              name='nis'
              id='nis'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nis}
              error={formik.touched.nis && Boolean(formik.errors.nis)}
              helperText={
                formik.touched.nis
                  ? formik.errors.nis
                    ? formik.errors.nis
                    : ' '
                  : ' '
              }
            />

            <TextField
              label='Nilai Biologi'
              type='number'
              variant='standard'
              fullWidth
              name='biologi'
              id='biologi'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.biologi}
              error={formik.touched.biologi && Boolean(formik.errors.biologi)}
              helperText={
                formik.touched.biologi
                  ? formik.errors.biologi
                    ? formik.errors.biologi
                    : ' '
                  : ' '
              }
            />

            <TextField
              label='Nilai Fisika'
              type='number'
              variant='standard'
              fullWidth
              name='fisika'
              id='fisika'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fisika}
              error={formik.touched.fisika && Boolean(formik.errors.fisika)}
              helperText={
                formik.touched.fisika
                  ? formik.errors.fisika
                    ? formik.errors.fisika
                    : ' '
                  : ' '
              }
            />

            <TextField
              label='Nilai Kimia'
              type='number'
              variant='standard'
              fullWidth
              name='kimia'
              id='kimia'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.kimia}
              error={formik.touched.kimia && Boolean(formik.errors.kimia)}
              helperText={
                formik.touched.kimia
                  ? formik.errors.kimia
                    ? formik.errors.kimia
                    : ' '
                  : ' '
              }
            />

            <TextField
              label='Nilai Matematika'
              type='number'
              variant='standard'
              fullWidth
              name='matematika'
              id='matematika'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.matematika}
              error={
                formik.touched.matematika && Boolean(formik.errors.matematika)
              }
              helperText={
                formik.touched.matematika
                  ? formik.errors.matematika
                    ? formik.errors.matematika
                    : ' '
                  : ' '
              }
            />

            <TextField
              label='Nilai Indonesia'
              type='number'
              variant='standard'
              fullWidth
              name='indonesia'
              id='indonesia'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.indonesia}
              error={
                formik.touched.indonesia && Boolean(formik.errors.indonesia)
              }
              helperText={
                formik.touched.indonesia
                  ? formik.errors.indonesia
                    ? formik.errors.indonesia
                    : ' '
                  : ' '
              }
            />

            <TextField
              label='Nilai Inggirs'
              type='number'
              variant='standard'
              fullWidth
              name='inggris'
              id='inggris'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.inggris}
              error={formik.touched.inggris && Boolean(formik.errors.inggris)}
              helperText={
                formik.touched.inggris
                  ? formik.errors.inggris
                    ? formik.errors.inggris
                    : ' '
                  : ' '
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Batal</Button>
            <Button
              autoFocus
              variant='contained'
              type='submit'
              disabled={formik.isSubmitting}
            >
              Tambahkan
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddGradeModal;
