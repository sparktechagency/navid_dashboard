import baseApis from '../baseApis/baseApis';

export const userApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: '/auth/get-all',
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
    blockUser: builder.mutation({
      query: ({ id }) => ({
        url: `/auth/block/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const { useGetAllUserQuery, useBlockUserMutation } = userApis;
