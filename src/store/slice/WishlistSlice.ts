import {
  RemoveWishlistAction,
  WishlistSliceInterface,
} from "./../../helper/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: WishlistSliceInterface = {
  wishlistProducts: JSON.parse(
    localStorage?.getItem("wishlistProducts") || "[]"
  ),
};

export const WishlistSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const newItemId = action.payload.id;
      const existingItem = state.wishlistProducts.find(
        (item) => item.id === newItemId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.wishlistProducts.unshift(action.payload);
      }
    },

    deleteWishlistItem: (state, action: RemoveWishlistAction) => {
      state.wishlistProducts = state.wishlistProducts.filter(
        (item) => item.id !== action.payload
      );
    },

    emptyWishlist: (state) => {
      state.wishlistProducts = [];
    },
  },
});

export const { addToWishlist, deleteWishlistItem, emptyWishlist } =
  WishlistSlice.actions;
export default WishlistSlice.reducer;
