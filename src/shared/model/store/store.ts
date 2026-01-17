import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "../slices/sessionSlice";
import templatesModalReducer from "../slices/templatesModalSlice";




export const store = configureStore({
  reducer: {
    session: sessionReducer,
    templatesModal: templatesModalReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;