import { createSlice } from "@reduxjs/toolkit";
import {
  BaseSliceInterface,
  CartProductsAction,
  DeleteCartAction,
} from "../../helper/types";

const initialState: BaseSliceInterface = {
  cartProducts: JSON.parse(localStorage?.getItem("cartProducts") || "[]"),
};

export const BaseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    addCartItems: (state, action: CartProductsAction) => {
      const newItemId = action.payload.id;
      const existingItem = state.cartProducts.find(
        (item) => item.id === newItemId
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cartProducts.unshift(action.payload);
      }
    },

    deleteCartItem: (state, action: DeleteCartAction) => {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addCartItems, deleteCartItem } = BaseSlice.actions;
export default BaseSlice.reducer;
