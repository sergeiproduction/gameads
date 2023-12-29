import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Удалить этот код после подключения к бэку 
import testData from "../../assets/CampaignsAdCard.json"

export const fetchCampaigns = createAsyncThunk("campaigns/fetchCampaigns", async () => {
  const { data } = await axios.get("/campaigns");
  return data;
});

const initialState = {
  data: [],
  status: "loading",
};

const campaignsSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaigns.pending, (state) => {
        state.data = [];
        state.status = "loading";
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchCampaigns.rejected, (state) => {
        state.data = testData; //После подключения к бэку удалить
        // state.data = [];
        state.status = "error";
      });
  },
});

export const campaignsReducer = campaignsSlice.reducer;
