import baseApis from '../baseApis/baseApis';

export const profileApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getProfileData: builder.query({
      query: () => ({
        url: '/auth/profile',
        method: 'GET',
      }),
      providesTags: ['profile'],
    }),
    updateProfileData: builder.mutation({
      query: (data) => {
        return {
          url: '/auth/update-profile',
          method: 'PATCH',
          body: data,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        };
      },
      invalidatesTags: ['profile'],
    }),
  }),
});

export const { useGetProfileDataQuery, useUpdateProfileDataMutation } =
  profileApis;
