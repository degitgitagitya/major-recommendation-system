import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { login } from '@lib/fetcher/server/auth';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error('No credentials');
        const { email: identifier, password } = credentials;
        const result = await login({
          identifier,
          password,
        });
        if (result) {
          return {
            id: result.user.id,
            email: result.user.email,
            username: result.user.username,
            role: result.user.is_admin ? 'admin' : 'user',
          };
        } else {
          throw new Error('Credentials not found');
        }
      },
    }),
  ],
  secret: 'S9Xs9SWHY2',
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.error = token.error;
        session.user = {
          ...session.user,
          role: token.role,
          sub: token.sub,
          email: token.email,
          username: token.username,
        };
      }
      return session;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        token.username = user.username as string;
        token.sub = user.id;
        token.email = user.email;
        token.role = user.role;
        return token;
      }
      return token;
    },
  },
});
