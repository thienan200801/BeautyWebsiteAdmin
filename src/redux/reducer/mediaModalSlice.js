import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
};
const mediaModalSlice = createSlice({
  name: "imageModal",
  initialState,
  reducers: {
    setModalVisibility: (state, action) => {
      state.visible = action.payload;
    },
  },
});

export default mediaModalSlice.reducer;

export const { setModalVisibility } = mediaModalSlice.actions;
