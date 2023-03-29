import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  configuration: null,
  loading: false,
};

export const fetchConfigurationById = createAsyncThunk(
  "fetchConfigurationById",
  async () => {
    try {
      const response = await axios.get(
        `https://api-test.innoloft.com/configuration/${
          import.meta.env.VITE_APP_ID
        }/`
      );
      const configData = response.data;
      //   console.log(process.env.REACT_APP_APP_ID);
      return configData;
    } catch (error) {
      return { message: error.message };
    }
  }
);

const configurationSlice = createSlice({
  name: "configurations",
  initialState,
  reducers: {},
  extraReducers: {
    // get configuration by configuration Id
    [fetchConfigurationById.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchConfigurationById.fulfilled]: (state, action) => {
      state.loading = false;
      state.configuration = action.payload;
    },
    [fetchConfigurationById.rejected]: (state, action) => {
      state.loading = true;
    },
  },
});

export default configurationSlice.reducer;
