import { configureStore } from '@reduxjs/toolkit';

import sidebarReducer from './slices/sidebarSlice';
import postReducer from './slices/postGeneration';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    post: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
