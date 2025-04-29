import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../store";

interface SidebarState {
  collapsed: boolean;
}

const initialState: SidebarState = {
  collapsed: true,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    expand: (state) => {
      state.collapsed = false;
    },
    collapse: (state) => {
      state.collapsed = true;
    },
    toggle: (state) => {
      state.collapsed = !state.collapsed;
    },
  },
});

export const { expand, collapse, toggle } = sidebarSlice.actions;
export const selectSidebarCollapsed = (state: RootState) =>
  state.sidebar.collapsed;
export default sidebarSlice.reducer;
