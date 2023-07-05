import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import BaseSlice from "./slice/BaseSlice";
import WishlistSlice from "./slice/WishlistSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["base", "wishList"],
  blacklist: ["table"],
};

const rootReducer = combineReducers({
  base: BaseSlice,
  wishList: WishlistSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
        ignoredPaths: ["register"],
      },
    }),
});

export const persistor = persistStore(store);
