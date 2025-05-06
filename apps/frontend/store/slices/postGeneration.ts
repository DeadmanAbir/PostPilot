import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

interface PostState {
  postGenerated: boolean;
}

const initialState: PostState = {
  postGenerated: false,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostGenerated: (state, action): void => {
      state.postGenerated = action.payload;
    },
    resetPostGenerated: (state): void => {
      state.postGenerated = false;
    },
  },
});

export const { setPostGenerated, resetPostGenerated } = postSlice.actions;
export const selectPostGenerated = (state: RootState): boolean =>
  state.post.postGenerated;
export default postSlice.reducer;
