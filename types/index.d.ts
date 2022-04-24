declare namespace NodeJS {
  export interface ProcessEnv {
    CMS_URL: string;
    CMS_TOKEN: string;
    NEXTAUTH_URL: string;
    NEXT_PUBLIC_BASE_URL: string;
  }
}
