import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const ISSERVER = typeof window === "undefined";

const initialState = {
  cartItems:
    !ISSERVER && localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      const tmpProduct = { ...action.payload, quantity: 1 };
      const itemId = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemId >= 0) {
        state.cartItems[itemId].quantity += 1;
      } else {
        state.cartItems.push(tmpProduct);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        toast.success(`${action.payload.name} Added to Cart`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },

    remove(state, action) {
      toast.success(`Item Reomved from Cart`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const updatedCartItems = (state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      ));

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      state.cartItems = updatedCartItems;
    },
    increase(state, action) {
      const itemId = state.cartItems.findIndex(
        (item) => item._id === action.payload
      );
      state.cartItems[itemId].quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decrease(state, action) {
      const itemId = state.cartItems.findIndex(
        (item) => item._id === action.payload
      );
      if (state.cartItems[itemId].quantity <= 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload
        );
      } else {
        state.cartItems[itemId].quantity -= 1;
      }
    },
    cartClear(state, action) {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});
export const { add, remove, increase, decrease, cartClear } = cartSlice.actions;
export default cartSlice.reducer;
