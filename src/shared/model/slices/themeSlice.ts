import { createSlice } from "@reduxjs/toolkit";

const THEME_KEY = 'theme';

interface ThemeState {
  value: 'sun' | 'moon';
}

const initialState: ThemeState = {
  value: localStorage.getItem(THEME_KEY) as ThemeState['value']
};

if (typeof window !== 'undefined') {
  document.documentElement.classList.toggle('dark', initialState.value === 'moon');
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.value === 'sun' ? 'moon' : 'sun';
      state.value = newTheme;
      localStorage.setItem(THEME_KEY, newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'moon');
    }
  }
});


export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer
