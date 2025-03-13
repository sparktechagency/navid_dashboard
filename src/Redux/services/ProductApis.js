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
    createProducts: builder.mutation({
      query: ({ data }) => {
        const formData = new FormData();
        Object.keys(data)?.map((key) => {
          if (data[key]) {
            formData.append(key, data[key]);
          }
        });
        formData.forEach((el) => console.log({ el }));
        return {
          url: '/product/create',
          method: 'POST',
          body: formData,
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
      query: ({ id, data }) => ({
        url: `/product/update/${id}`,
        method:'PATCH',
        body: data,
      }),
      invalidatesTags: ['product'],
    }),
  }),
});

export const {
  useGetProductQuery,
  useCreateProductsMutation,
  useDeleteProductsMutation,
  useUpdateProductMutation
} = ProductApis;
