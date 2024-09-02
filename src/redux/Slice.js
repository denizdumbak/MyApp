import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const imagesEndpoint = "https://jsonplaceholder.typicode.com/photos"

export const fetchImages = createAsyncThunk("photos/fetchPhotos", async () => {
    const response = await axios.get(imagesEndpoint);
    return response.data.slice(0, 20);
})


const imagesSlice = createSlice({
    name: "images",
    initialState: {
        data: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchImages.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchImages.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.data = action.payload
            })
            .addCase(fetchImages.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
    }
});

export default imagesSlice.reducer;