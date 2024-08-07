import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, thunkAPI) => {
        console.log("Dispatching loginUser with email:", email);
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            console.log("Received response from server:", response);

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Login failed with response:", errorData);
                return thunkAPI.rejectWithValue(errorData.msg || 'Login failed');
            }

            const data = await response.json();
            console.log("Response data from server:", data);

            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                return { user: data.user, token: data.token };
            } else {
                return thunkAPI.rejectWithValue(data.msg || 'Login failed');
            }
        } catch (error) {
            console.error("Login error:", error);
            return thunkAPI.rejectWithValue(error.message || 'Login failed');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ email, password }, thunkAPI) => {
        console.log("Dispatching registerUser with email:", email);
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            console.log("Received response from server:", response);

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Registration failed with response:", errorData);
                return thunkAPI.rejectWithValue(errorData.msg || 'Registration failed');
            }

            const data = await response.json();
            console.log("Response data from server:", data);

            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                return { user: data.user, token: data.token };
            } else {
                return thunkAPI.rejectWithValue(data.msg || 'Registration failed');
            }
        } catch (error) {
            console.error("Registration error:", error);
            return thunkAPI.rejectWithValue(error.message || 'Registration failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                console.log("Login pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log("Login fulfilled", action.payload);
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                console.log("User logged in successfully:", state.user);
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log("Login rejected", action.payload);
                state.loading = false;
                state.error = action.payload;
                console.log("Login failed:", state.error);
            })
            .addCase(registerUser.pending, (state) => {
                console.log("Registration pending");
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log("Registration fulfilled", action.payload);
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                console.log("User registered successfully:", state.user);
            })
            .addCase(registerUser.rejected, (state, action) => {
                console.log("Registration rejected", action.payload);
                state.loading = false;
                state.error = action.payload;
                console.log("Registration failed:", state.error);
            });
    },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;








