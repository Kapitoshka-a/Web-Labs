import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const removeFromCartBackend = createAsyncThunk(
    "house/removeFromCartBackend",
    async (houseId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/cart/remove/${houseId}/`);
            return { houseId, message: response.data.message };
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to remove house from cart.");
        }
    }
);

export const fetchCartItems = createAsyncThunk(
    "house/fetchCartItems",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/cart/items/");
            return response.data; // Return the list of cart items, including performance
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch cart items.");
        }
    }
);

export const addToCartBackend = createAsyncThunk(
    "house/addToCartBackend",
    async ({ houseId, rentalDays, performance }, { getState, rejectWithValue }) => {
        try {
            const { house } = getState();
            const isAlreadyInCart = house.cart.some((item) => item.house.id === houseId);
            if (isAlreadyInCart) {
                return rejectWithValue("House is already in cart.");
            }

            const response = await axios.post(`http://127.0.0.1:8000/api/cart/add/${houseId}/`, {
                rentalDays,
                performance, // Send performance level
            });
            return response.data; // Include performance in response payload
        } catch (error) {
            return rejectWithValue("Failed to add house to cart.");
        }
    }
);

export const updateRentalDaysBackend = createAsyncThunk(
    "house/updateRentalDaysBackend",
    async ({ houseId, rentalDays }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/update/rent_day/${houseId}/`, {
                rentalDays,
            });
            return { houseId, rentalDays, message: response.data.message };
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update rental days.");
        }
    }
);

export const fetchCartTotalPrice = createAsyncThunk(
    "house/fetchCartTotalPrice",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/cart/total_price/");
            return response.data.total_price; // Return the total price
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch total price.");
        }
    }
);

const houseSlice = createSlice({
    name: "house",
    initialState: {
        houses: [],
        cart: [],
        total_price: 0,
        status: "idle", // "idle" | "loading" | "succeeded" | "failed"
        message: null,
        error: null,
    },
    reducers: {
        clearMessage(state) {
            state.message = null;
        },
        clearCart(state) {
            state.cart = []; // Clear the cart
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCartBackend.fulfilled, (state, action) => {
                const newItem = action.payload;
                if (!newItem.house) {
                    // If the response does not contain `house`, use the structure accordingly
                    state.cart.push({
                        house: newItem, // Use the item as `house`
                        rental_days: 1, // Default to 1 day
                        performance: newItem.performance || 'basic', // Set performance
                    });
                } else {
                    // If the structure matches, add it as it is
                    state.cart.push({
                        ...newItem,
                        performance: newItem.performance || 'basic', // Default to 'basic' if not specified
                    });
                }
                state.message = `House successfully added to cart.`;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.cart = action.payload.items.map(item => ({
                    ...item,
                    performance: item.performance || 'basic', // Ensure performance is set
                })) || [];
            })
            .addCase(fetchCartTotalPrice.fulfilled, (state, action) => {
                state.total_price = action.payload || 0; // Update the total price
            })
            .addCase(updateRentalDaysBackend.fulfilled, (state, action) => {
                state.message = action.payload.message;
            })
            .addCase(removeFromCartBackend.fulfilled, (state, action) => {
                state.cart = state.cart.filter((item) => item.house.id !== action.meta.arg);
                state.message = action.payload.message;
            });
    },
});

export const { clearMessage, clearCart } = houseSlice.actions;
export default houseSlice.reducer;
