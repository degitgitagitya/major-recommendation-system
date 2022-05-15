import axios from 'axios';

import type { AxiosError } from 'axios';
import type { ClientErrorData } from '@lib/errorHandler/client';

type Details = Record<any, any>;

export interface Error {
  status: string;
  name: string;
  message: string;
  details: Details;
}

export interface CMSError {
  data?: any;
  error: Error;
}

export const resolvePromise = async <T>(
  promise: Promise<{
    data: T;
  }>
) => {
  try {
    const { data } = await promise;
    return [data, null] as const;
  } catch (error) {
    if (error instanceof Error) {
      return [null, resolveError(error as AxiosError<CMSError>)] as const;
    } else if (axios.isCancel(error)) {
      return [
        null,
        {
          code: 500,
          detail: 'Upload canceled',
        },
      ] as const;
    } else {
      return [
        null,
        {
          code: 500,
          detail: 'Something went wrong',
        },
      ] as const;
    }
  }
};

const resolveError = (error: AxiosError<CMSError>): ClientErrorData => {
  if (error.response) {
    const { status } = error.response;
    if (status === 422) {
      return {
        code: status,
        detail: 'Validation Error',
      };
    }
    return {
      code: status,
      detail: error.response.data.error.message || error.response.statusText,
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
