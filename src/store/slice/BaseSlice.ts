import { createSlice } from "@reduxjs/toolkit";
import { BaseSliceInterface, setCartProductsAction } from "../../helper/types";

const initialState: BaseSliceInterface = {
  cartProducts: [],
};

export const BaseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    setCartProducts: (state, action: setCartProductsAction) => {
      state.cartProducts = action.payload;
    },
  },
});

export const { setCartProducts } = BaseSlice.actions;
export default BaseSlice.reducer;
