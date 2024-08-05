import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, thunkAPI) => {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (data.success) {
            return data.user;
        } else {
            return thunkAPI.rejectWithValue(data.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ email, password }, thunkAPI) => {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (data.success) {
            return data.user;
        } else {
            return thunkAPI.rejectWithValue(data.message);
        }
    }
);



const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.user = action.payload.token;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//
// export const loginUser = createAsyncThunk(
//     'auth/loginUser',
//     async ({ email, password }, thunkAPI) => {
//         try {
//             const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/login`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email, password }),
//             });
//
//             const data = await response.json();
//             if (!response.ok) {
//                 return thunkAPI.rejectWithValue(data.message);
//             }
//             return data.user;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );
//
// export const registerUser = createAsyncThunk(
//     'auth/registerUser',
//     async ({ email, password }, thunkAPI) => {
//         try {
//             const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/register`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email, password }),
//             });
//
//             const data = await response.json();
//             if (!response.ok) {
//                 return thunkAPI.rejectWithValue(data.message);
//             }
//             return data.user;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );
//
// const authSlice = createSlice({
//     name: 'auth',
//     initialState: {
//         user: null,
//         token: null,
//         loading: false,
//         error: null,
//     },
//     reducers: {
//         logout: (state) => {
//             state.user = null;
//             state.token = null;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(loginUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(loginUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.user = action.payload;
//                 state.token = action.payload.token; // Make sure to store the token
//             })
//             .addCase(loginUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(registerUser.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(registerUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.user = action.payload;
//                 state.token = action.payload.token; // Make sure to store the token
//             })
//             .addCase(registerUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     },
// });
//
// export const { logout } = authSlice.actions;
// export default authSlice.reducer;



