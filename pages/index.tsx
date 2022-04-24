import * as Yup from 'yup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Alert, Button, Card, Divider, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

import type { NextPage } from 'next';
import type { SignInResponse } from 'next-auth/react';

const Home: NextPage = () => {
  const router = useRouter();

  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;

      const signInResult: SignInResponse | undefined = await signIn(
        'credentials',
        {
          redirect: false,
          email,
          password,
        }
      );

      if (signInResult) {
        const { error } = signInResult;
        if (error) {
          setLoginErrorMessage(error);
        } else {
          const { redirect_url } = router.query;

          if (redirect_url) {
            router.push(`${redirect_url}`);
          } else {
            router.push('/dashboard');
          }
        }
      } else {
        setLoginErrorMessage('Authentication error');
      }
    },
  });

  return (
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
              gap: 4,
              boxShadow: 4,
            }}
          >
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              Sign In
            </Typography>

            <Divider variant='middle' />

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
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={
                formik.touched.password
                  ? formik.errors.password
                    ? formik.errors.password
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
                onClick={() => router.push('/register')}
                variant='outlined'
                disabled={formik.isSubmitting}
              >
                Register
              </Button>
            </Box>
          </Card>
        </form>
      </Box>
    </Box>
  );
};

export default Home;
