import { createSlice } from "@reduxjs/toolkit";

const THEME_KEY = 'theme';

interface ThemeState {
  value: 'sun' | 'moon';
}

const initialState: ThemeState = {
  value: 'sun'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.value === 'sun' ? 'moon' : 'sun';
      state.value = newTheme;
      localStorage.setItem(THEME_KEY, newTheme); 
    }
  }
});

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer
