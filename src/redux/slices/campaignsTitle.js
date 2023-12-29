import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Удалить этот код после подключения к бэку 
import testData from "../../assets/OptionPanelLinks.json"

export const fetchCampaignsTitle = createAsyncThunk("campaigns/fetchTitle", async () => {
  const { data } = await axios.get("/campaigns/title");
  return data;
});

const initialState = {
  data: [],
  status: "loading",
};

const campaignsTitleSlice = createSlice({
  name: "campaignsTitle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaignsTitle.pending, (state) => {
        state.data = [];
        state.status = "loading";
      })
      .addCase(fetchCampaignsTitle.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchCampaignsTitle.rejected, (state) => {
        state.data = testData; //После подключения к бэку удалить
        // state.data = [];
        state.status = "error";
      });
  },
});

export const campaignsTitleReducer = campaignsTitleSlice.reducer;
