import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import cartStateSlice from "./cartStateSlice";
import userSlice from "./userSlice";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";

const initStore = () => {
  return configureStore(
    {
      reducer: {
        cart: cartSlice,
        cartState: cartStateSlice,
        userInfo: userSlice,
      },
    },
    applyMiddleware(thunk)
  );
};
export const wrapper = createWrapper(initStore);
