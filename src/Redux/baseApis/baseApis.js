import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from '../../Utils/server';

const baseApis = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }),
  tagTypes: ['profile', 'category','subCategory', 'product', 'user', 'pickup'],
  endpoints: () => ({}),
});

export default baseApis;
