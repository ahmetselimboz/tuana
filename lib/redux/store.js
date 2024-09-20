import { configureStore } from "@reduxjs/toolkit";
import appsReducer from "./features/appSettings/appsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      appsSettings: appsReducer,
    },
  });
};
