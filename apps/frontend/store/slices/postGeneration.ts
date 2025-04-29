import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../store";

interface PostState {
  postGenerated: boolean;
}

const initialState: PostState = {
  postGenerated: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostGenerated: (state, action) => {
      state.postGenerated = action.payload;
    },
    resetPostGenerated: (state) => {
      state.postGenerated = false;
    },
  },
});

export const { setPostGenerated, resetPostGenerated } = postSlice.actions;
export const selectPostGenerated = (state: RootState) =>
  state.post.postGenerated;
export default postSlice.reducer;
