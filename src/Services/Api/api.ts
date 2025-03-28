/* eslint-disable import/no-cycle */
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  BaseQueryApi,
} from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../Store';
import { API_BASE_URL } from './Constants';
import { ResponseOptions } from './api.d';

const baseQuery: BaseQueryFn = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: async (headers: Headers, { getState }) => {
    const { token } = (getState() as RootState).common;

    headers.set('x-rapidapi-key', import.meta.env.VITE_RAPIDAPI_KEY);
    headers.set('x-rapidapi-host', import.meta.env.VITE_BASE_URL);

    //   if (token) {
    //   headers.append('authorization', `${token}`);
    // }

    if (token) {
      headers.set('authorization', `${token}`);
    }

    return headers;
  },
});

const baseQueryWithInterceptor = async (
  args: unknown,
  api: BaseQueryApi,
  extraOptions: object
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (
    (result as ResponseOptions).error &&
    (result as ResponseOptions).error.status === 401
  ) {
    // here you can deal with 401 error
  }
  return result;
};

const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});

export default api;
