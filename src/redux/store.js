import { configureStore } from "@reduxjs/toolkit";

import { filterReducer } from "./slices/filter";

import { authReducer } from "./slices/auth";
import { userReducer } from "./slices/user";
import { appsReducer } from "./slices/apps";
import { campaignsReducer } from "./slices/campaigns";
import { campaignsTitleReducer } from "./slices/campaignsTitle";

const store = configureStore({
    reducer: {
        filter: filterReducer,
        
        auth: authReducer,
        user: userReducer,
        apps: appsReducer,
        campaigns: campaignsReducer,
        campaignsTitle: campaignsTitleReducer,
    },
});

export default store;