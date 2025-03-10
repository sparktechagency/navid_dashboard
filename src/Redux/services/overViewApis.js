import baseApis from '../baseApis/baseApis';

const overViewApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getOverView: builder.query({
      query: ({ year_payment, year_user }) => ({
        url: `/dashboard/get-overview`,
        method: 'GET',
        params: {
          year_payment,
          year_user,
        },
      }),
      providesTags: ['overview'],
    }),
  }),
});

export const { useGetOverViewQuery } = overViewApis;
