import { createSlice } from "@reduxjs/toolkit";

// status contains: idle| "loading" | "succeeded" | "failed",
const initState = {
  isLoading: false,
  error: " ",
};

const loaderSlice = createSlice({
  name: "loader",
  initialState: initState,
  reducers: {
    startLoading: (state, action) => {
      state.isLoading = true;
    },
    stopLoading: (state, action) => {
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default loaderSlice.reducer;

export const { startLoading, stopLoading, setError } = loaderSlice.actions;
