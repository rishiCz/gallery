"use client"

import { configureStore } from "@reduxjs/toolkit"
import activeImageReducer from "./features/activeImage/activeImageSlice"

export const store = configureStore({
    reducer:{
        activeImage: activeImageReducer
    }
})

export type RootState = ReturnType <typeof store.getState>;
export type AppDispatch = typeof store.dispatch