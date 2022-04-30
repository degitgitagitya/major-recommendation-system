import { useEffect } from 'react';
import { Box } from '@mui/system';
import { Container, LinearProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import type { NextPage } from 'next';

const Login: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user.role === 'admin') {
      router.push('/admin/dashboard');
    }
    if (session && session.user.role === 'user') {
      router.push('/dashboard');
    }
  }, [session, router]);

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          minHeight: '600px',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        Please wait...
        <Box
          sx={{
            width: {
              xs: '100%',
              md: '250px',
            },
            mt: 2,
          }}
        >
          <LinearProgress />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
