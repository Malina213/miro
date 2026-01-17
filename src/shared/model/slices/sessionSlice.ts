import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

type Session = { 
    userId: string; 
    email: string;
    exp: number; 
    iat: number 
};

const TOKEN_KEY = "token";

type SessionState = {
  token: string | null;
  session: Session | null;
};

const initialToken = localStorage.getItem(TOKEN_KEY);

const initialState: SessionState = {
  token: localStorage.getItem(TOKEN_KEY),
  session: initialToken ? jwtDecode<Session>(initialToken) : null,
};

export const refreshToken = createAsyncThunk<string | null, void>(
  "session/refreshToken",
  async (_, { getState }) => {
    const state = getState() as { session: SessionState };
    const token = state.session.token;
    if (!token) return null;

    const decoded = jwtDecode<Session>(token);

    if (decoded.exp >= Date.now() / 1000) return token;

    const { publicClient } = await import("@/shared/api/instance");
    const r = await publicClient.POST("/auth/refresh");
    return r.data?.accessToken ?? null;
  },
);

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      const token = action.payload;
      localStorage.setItem(TOKEN_KEY, token);
      state.token = token;
      state.session = jwtDecode<Session>(token);
    },
    logout(state) {
      localStorage.removeItem(TOKEN_KEY);
      state.token = null;
      state.session = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      const newToken = action.payload;
      if (newToken) {
        localStorage.setItem(TOKEN_KEY, newToken);
        state.token = newToken;
        state.session = jwtDecode<Session>(newToken);
      } else {
        localStorage.removeItem(TOKEN_KEY);
        state.token = null;
        state.session = null;
      }
    });
  },
});

export const { login, logout } = sessionSlice.actions;
export default sessionSlice.reducer;