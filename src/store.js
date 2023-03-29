import { configureStore } from "@reduxjs/toolkit";
import configurationSlice from "./features/Configuration/configurationSlice";
import productSlice from "./features/products/productSlice";

const store = configureStore({
  reducer: {
    products: productSlice,
    configurations: configurationSlice,
  },
});

export default store;
