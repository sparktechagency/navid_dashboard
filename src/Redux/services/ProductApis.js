import baseApis from '../baseApis/baseApis';

export const ProductApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ whole_sale, search }) => ({
        url: `/product/get-all`,
        method: 'GET',
        params: { whole_sale, search },
      }),
      providesTags: ['product'],
    }),
  }),
});

export const { useGetProductQuery } = ProductApis;
