import { authorize as authorizeUser } from '@lib/fetcher/auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { data: result } = await authorizeUser(
          credentials?.email,
          credentials?.password
        );

        if (result.length === 0) {
          throw new Error('Credentials not found');
        } else {
          return {
            user: {
              id: result[0].id,
              email: result[0].attributes.email,
            },
          };
        }
      },
    }),
  ],
  secret: 'S9Xs9SWHY2',
});
