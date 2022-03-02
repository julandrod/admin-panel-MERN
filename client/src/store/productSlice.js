import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async ({ productInfo, token }) => {
    const response = await axios.post("/products", productInfo, {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  }
);

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async ({ token }) => {
    const response = await axios.get("/products", {
      headers: {
        "x-access-token": token,
      },
    });
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ id, token }) => {
    const response = await axios.delete(`/products/${id}`, {
      headers: {
        "x-access-token": token,
      },
    });
    if (response.status === 200) return { id };
  }
);

const initialState = {
  products: [],
  productLoading: false,
  productError: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    // Create new product
    [createProduct.pending]: (state) => {
      state.productLoading = true;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.productLoading = false;
      state.products.push(action.payload);
    },
    [createProduct.rejected]: (state) => {
      state.productLoading = false;
      state.productError = true;
    },
    // Get all products
    [getAllProducts.pending]: (state) => {
      state.productLoading = true;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.productLoading = false;
      state.products = action.payload;
    },
    [getAllProducts.rejected]: (state) => {
      state.productLoading = false;
      state.productError = true;
    },
    // Delete single product
    [deleteProduct.pending]: (state) => {
      state.productLoading = true;
    },
    [deleteProduct.pending]: (state, action) => {
      state.productLoading = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    [deleteProduct.rejected]: (state) => {
      state.productLoading = false;
      state.productLoading = true;
    },
  },
});

export const selectProductState = (state) => state.product;

export default productSlice.reducer;
