import baseApis from '../baseApis/baseApis';

export const addressApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllpickupAddress: builder.query({
      query: () => ({
        url: `/pick-address/get-all`,
        method: 'GET',
      }),
      providesTags: ['pickup'],
    }),
    createNewPickupAddress: builder.mutation({
      query: ({ data }) => ({
        url: '/pick-address/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['pickup'],
    }),

    deletePickupAddress: builder.mutation({
      query: ({ id }) => ({
        url: `/pick-address/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['pickup'],
    }),
  }),
});

export const {
  useGetAllpickupAddressQuery,
  useCreateNewPickupAddressMutation,
  useDeletePickupAddressMutation,
} = addressApis;
