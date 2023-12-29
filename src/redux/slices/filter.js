import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apps: {
    searchValue: "",
    type: "all",
    minDownloads: null,
    maxDownloads: null,
  },
  campaigns: {
    searchValue: "",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setAppsSearchValue(state, action) {
      state.apps.searchValue = action.payload;
    },
    setAppsType(state, action) {
      state.apps.type = action.payload;
    },
    setAppsMinDownloads(state, action) {
      state.apps.minDownloads = action.payload;
    },
    setAppsMaxDownloads(state, action) {
      state.apps.maxDownloads = action.payload;
    },
    resetAppsFilter(state) {
      state.apps.searchValue = "";
      state.apps.type = "all";
      state.apps.minDownloads = null;
      state.apps.maxDownloads = null;
    },

    setCampaignsSearchValue(state, action) {
      state.campaigns.searchValue = action.payload;
    },
    resetCampaignsFilter(state) {
      state.campaigns.searchValue = "";
    },
  },
});

export const {
  setAppsSearchValue,
  setAppsType,
  setAppsMinDownloads,
  setAppsMaxDownloads,
  resetAppsFilter,
  setCampaignsSearchValue,
  resetCampaignsFilter,
} = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
