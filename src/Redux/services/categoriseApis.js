import baseApis from '../baseApis/baseApis';

export const categoriseApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: ({ page }) => ({
        url: '/category/get-all',
        method: 'GET',
        params: { page },
      }),
      providesTags: ['category'],
    }),
    deleteCategory: builder.mutation({
      query: ({ data }) => ({
        url: `/category/delete/${data?.id}`,
        method: 'DELETE',
        body: {
          name: data?.name,
          password: data?.password,
        },
      }),
      invalidatesTags: ['category'],
    }),
    createNewCategory: builder.mutation({
      query: (data) => ({
        url: '/category/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['category'],
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/category/update/${id}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['category'],
    }),
    // sub categroy
    getSubCategory: builder.query({
      query: ({ id }) => ({
        url: '/service/get-all',
        method: 'GET',
        params: { category: id },
      }),
      providesTags: ['subCategory'],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useDeleteCategoryMutation,
  useCreateNewCategoryMutation,
  useUpdateCategoryMutation,
  useGetSubCategoryQuery,
} = categoriseApis;
