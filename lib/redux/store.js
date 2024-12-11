import { configureStore } from "@reduxjs/toolkit";
import appsReducer from "./features/appSettings/appsSlice";
import dateReducer from "./features/dateSettings/dateSlice";
import userReducer from "./features/userSettings/userSlice";
import chatReducer from "./features/chatSetttings/chatSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      appsSettings: appsReducer,
      dateSettings:dateReducer,
      userSettings:userReducer,
      chatSettings:chatReducer,
    },
  });
};
