import { configureStore } from "@reduxjs/toolkit"
import useReducer, { setUser, clearUser } from "./userSlice"
import cartReducer, { setCart, clearCart } from "./cartSlice"

const store = configureStore({
    reducer: {
        user: useReducer,
        cart: cartReducer,
    }

})

export default store
export {setUser, clearUser, setCart, clearCart}