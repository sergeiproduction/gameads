import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Удалить этот код после подключения к бэку 
import testData from "../../assets/AppsAppCards.json"

export const fetchApps = createAsyncThunk("apps/fetchApps", async () => {
  const { data } = await axios.get("/apps");
  return data;
});

const initialState = {
  data: [],
  status: "loading",
};

const appsSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApps.pending, (state) => {
        state.data = [];
        state.status = "loading";
      })
      .addCase(fetchApps.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchApps.rejected, (state) => {
        state.data = testData; //После подключения к бэку удалить
        // state.data = [];
        state.status = "error";
      });
  },
});

export const appsReducer = appsSlice.reducer;
