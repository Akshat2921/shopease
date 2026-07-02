import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import productReducer from "./reducers/productSlice";
import cartReducer from "./reducers/CartSlice";
import wishlistReducer from "./reducers/wishlistSlice";
import orderReducer from "./reducers/orderSlice";
import reviewReducer from "./reducers/reviewSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: orderReducer,
    reviews: reviewReducer,
  },
});
