import { configureStore } from "@reduxjs/toolkit";
import appsReducer from "./features/appSettings/appsSlice";
import dateReducer from "./features/dateSettings/dateSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      appsSettings: appsReducer,
      dateSettings:dateReducer
    },
  });
};
