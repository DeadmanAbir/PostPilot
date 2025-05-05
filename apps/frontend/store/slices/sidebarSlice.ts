import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

interface SidebarState {
  collapsed: boolean;
}

const initialState: SidebarState = {
  collapsed: true,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    expand: (state): void => {
      state.collapsed = false;
    },
    collapse: (state): void => {
      state.collapsed = true;
    },
    toggle: (state): void => {
      state.collapsed = !state.collapsed;
    },
  },
});

export const { expand, collapse, toggle } = sidebarSlice.actions;
export const selectSidebarCollapsed = (state: RootState): boolean =>
  state.sidebar.collapsed;
export default sidebarSlice.reducer;
