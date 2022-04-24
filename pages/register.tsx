import * as Yup from 'yup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SuccessDialog from '@components/SuccessDialog';

import { Alert, Button, Card, Divider, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { register } from '@lib/fetcher/client/auth';
import { raiseError } from '@lib/errorHandler/client';

import type { NextPage } from 'next';

export const passwordRegex =
  /^(?=^.{8,}$)(?=.*\d)(?=.*[^a-zA-Z\d\s]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const Register: NextPage = () => {
  const router = useRouter();

  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      confirmed: true,
      blocked: false,
      role: 2,
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .matches(
          passwordRegex,
          'Your password must contain at least 8 characters, 1 numeric, 1 lowercase, 1 uppercase and 1 special character.'
        )
        .required('Enter your password'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm again your password'),
    }),
    onSubmit: async (values) => {
      const { email, username, password } = values;

      try {
        await register({
          email,
          username,
          password,
        });
        setOpen(true);
      } catch (error) {
        const errorMessage = raiseError(error);
        setLoginErrorMessage(errorMessage);
      }
    },
  });

  const toggleDialog = (open: boolean) => {
    setOpen(open);
  };

  return (
    <>
      <SuccessDialog
        open={open}
        setOpen={toggleDialog}
        callback={() => router.push('/')}
      />

      <Box sx={{ width: '100vw', height: '100vh' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Card
              sx={{
                p: 4,
                width: {
                  xs: '100%',
                  md: '400px',
                },
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                boxShadow: 4,
              }}
            >
              <Typography variant='h5' sx={{ textAlign: 'center' }}>
                Sign Up
              </Typography>

              <Divider variant='middle' />

              <TextField
                label='Username'
                type='text'
                variant='standard'
                fullWidth
                name='username'
                id='username'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={
                  formik.touched.username
                    ? formik.errors.username
                      ? formik.errors.username
                      : ' '
                    : ' '
                }
              />

              <TextField
                label='Email'
                type='email'
                variant='standard'
                fullWidth
                name='email'
                id='email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={
                  formik.touched.email
                    ? formik.errors.email
                      ? formik.errors.email
                      : ' '
                    : ' '
                }
              />

              <TextField
                label='Password'
                variant='standard'
                type='password'
                fullWidth
                name='password'
                id='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={
                  formik.touched.password
                    ? formik.errors.password
                      ? formik.errors.password
                      : ' '
                    : ' '
                }
              />

              <TextField
                label='Confirm Password'
                variant='standard'
                type='password'
                fullWidth
                name='confirmPassword'
                id='confirmPassword'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword
                    ? formik.errors.confirmPassword
                      ? formik.errors.confirmPassword
                      : ' '
                    : ' '
                }
              />

              {loginErrorMessage && (
                <Alert severity='error'>{loginErrorMessage}</Alert>
              )}

              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <Button
                  type='submit'
                  variant='contained'
                  disabled={formik.isSubmitting}
                >
                  Submit
                </Button>

                <Button
                  onClick={() => router.push('/')}
                  variant='outlined'
                  disabled={formik.isSubmitting}
                >
                  Log In
                </Button>
              </Box>
            </Card>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Register;
