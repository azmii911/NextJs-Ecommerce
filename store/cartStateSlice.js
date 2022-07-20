import { createSlice } from "@reduxjs/toolkit";
const initialState = false;
const cartStateSlice = createSlice({
  name: "cartState",
  initialState,
  reducers: {
    isOpen(state, {payload}) {
        return state = payload
    },
    Close() {
        return initialState
    }
    
  },
});
export const { isOpen, Close } = cartStateSlice.actions;
export default cartStateSlice.reducer;
