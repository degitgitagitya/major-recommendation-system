// eslint-disable-next-line
import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    user: {
      username: string;
      sub: number;
      email: string;
      role: string;
    };
    expires: string;
    access_token: string;
    error?: string;
  }
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    username: string;
    id: number;
    email: string;
    role: string;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    username: string;
    sub: number;
    email: string;
    error?: string;
    role: string;
  }
}
