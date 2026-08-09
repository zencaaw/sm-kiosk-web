import { configureStore } from "@reduxjs/toolkit";
import HeaderSlice from "./headerSlice";

export const store = configureStore({
  reducer: { HeaderSlice: HeaderSlice }
});

export type RootState = ReturnType<typeof store.getState>;
