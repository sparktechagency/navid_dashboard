import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  description: '',
  price: '',
  category: '',
  quantity: '',
  variants_red: null,
  variants_blue: null,
  whole_sale: false,
  variants_video: null,
  quantity_red: '',
  sub_category: '',
  size: [],
  size_green: [],
  quantity_blue: '',
  previous_price: '',
};

export const productCreateSlice = createSlice({
  name: 'productCreate',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      if (field in state) {
        state[field] = value;
      }
    },
    resetProductForm: () => initialState,
  },
});

export const { updateField, resetProductForm } = productCreateSlice.actions;
export default productCreateSlice.reducer;
