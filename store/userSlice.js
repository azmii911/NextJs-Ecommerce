import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const ISSERVER = typeof window === "undefined";

const initialState =
  !ISSERVER && localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    isLogged(state, action) {
      toast.success("Authentication Success!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return (state = action.payload);
    },
    isLoggedOut(state, action) {
      toast.success("Logged Out!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return (state = action.payload);
    },
    updateUser(state, action) {
      toast.success("Profile updated successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return (state = action.payload);
    },
  },
});
export const { isLogged, isLoggedOut, updateUser } = userSlice.actions;
export default userSlice.reducer;
