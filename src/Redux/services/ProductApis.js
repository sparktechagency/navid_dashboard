import baseApis from '../baseApis/baseApis';

export const ProductApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ whole_sale, search, page }) => ({
        url: `/product/get-all`,
        method: 'GET',
        params: { whole_sale, search, page },
      }),
      providesTags: ['product'],
    }),
    createProducts: builder.mutation({
      query: ({ data }) => {
        Object.keys(data)?.map((key) => {
          if (data[key]) {
            data.append(key, data[key]);
          }
        });
        return {
          url: '/product/create',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['product'],
    }),
    deleteProducts: builder.mutation({
      query: ({ id }) => ({
        url: `/product/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['product'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/product/update/${id}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['product'],
    }),
    singleProductGet: builder.query({
      query: ({ id }) => ({
        url: `/product/get-details/${id}`,
        method: 'GET',
      }),
      providesTags: ['product'],
    }),
  }),
});

export const {
  useGetProductQuery,
  useCreateProductsMutation,
  useDeleteProductsMutation,
  useUpdateProductMutation,
  useSingleProductGetQuery,
} = ProductApis;
