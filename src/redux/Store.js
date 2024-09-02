import { configureStore } from "@reduxjs/toolkit";
import imagesReducer  from "./Slice"


const store = configureStore({
    reducer: {
        images: imagesReducer
    }
});

export default store;