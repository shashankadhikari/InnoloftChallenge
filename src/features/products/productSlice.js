import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
let initialState = {
  products: null,
  loading: false,
};

export const fetchProductByProductId = createAsyncThunk(
  "products/fetchProductsBycategoryId",
  async (productId) => {
    try {
      const response = await axios.get(
        `https://api-test.innoloft.com/product/${productId}/`
      );
      const myData = response.data;
      return myData;
    } catch (error) {
      return { message: error.message };
    }
  }
);
export const updateProductByProductId = createAsyncThunk(
  "products/updateProductByProductId",
  async ({ productId, updatedProduct }) => {
    try {
      const response = await axios.put(
        `https://api-test.innoloft.com/product/${productId}/`,
        updatedProduct
      );
      return response.data;
    } catch (error) {
      return { message: error.message };
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    // get product by product Id
    [fetchProductByProductId.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchProductByProductId.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [fetchProductByProductId.rejected]: (state, action) => {
      state.loading = true;
    },
    // update product by product Id
    [updateProductByProductId.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProductByProductId.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      if (action.payload.id) {
        toast.success("Updated successfully");
      }
    },
    [updateProductByProductId.rejected]: (state, action) => {
      state.loading = true;
    },
  },
});

export default productSlice.reducer;
