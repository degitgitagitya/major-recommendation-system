import axios from 'axios';

import type { AxiosError } from 'axios';

export interface ClientErrorData {
  code: number;
  detail: string;
}

export const resolvePromise = async <T>(
  promise: Promise<{
    data: T;
  }>
): Promise<readonly [T, null] | readonly [null, ClientErrorData]> => {
  try {
    const { data } = await promise;
    return [data, null] as const;
  } catch (error) {
    if (error instanceof Error) {
      return [
        null,
        resolveErrorClient(error as AxiosError<ClientErrorData>),
      ] as const;
    } else if (axios.isCancel(error)) {
      return [
        null,
        {
          code: 500,
          detail: 'Pengiriman dibatalkan',
        },
      ] as const;
    } else {
      return [
        null,
        {
          code: 500,
          detail: 'Terjadi kesalahan, mohon coba lagi / hubungi kami',
        },
      ] as const;
    }
  }
};

export const resolveErrorClient = (
  error: AxiosError<ClientErrorData>
): ClientErrorData => {
  if (error.response) {
    const { status } = error.response;

    if (status === 422) {
      return {
        code: error.response.status,
        detail: 'Kesalahan pada validasi',
      };
    }

    return {
      code: error.response.status,
      detail: error.response.data.detail || error.response.statusText,
    };
  } else if (error.request) {
    return {
      code: 500,
      detail: 'The request was made but no response was received',
    };
  } else {
    return {
      code: 500,
      detail: 'Something happened while setting up the request',
    };
  }
};
