import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "../slices/sessionSlice";
import themeReducer from "../slices/themeSlice";


export const store = configureStore({
  reducer: {
    session: sessionReducer,
    theme: themeReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;