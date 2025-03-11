import baseApis from '../baseApis/baseApis';

export const policyApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getPolicy: builder.query({
      query: ({ type }) => ({
        url: `/setting/${type}`,
        method: 'GET',
      }),
      providesTags: ['policy'],
    }),
    updateSetting: builder.mutation({
      query: ({ data }) => ({
        url: '/setting/create',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['policy'],
    }),
  }),
});

export const { useGetPolicyQuery, useUpdateSettingMutation } = policyApis;
