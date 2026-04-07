import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "dark",
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        loadTheme: (state) => {
            state.theme = "dark";
            document.documentElement.classList.add("dark");
        },
    },
});

export const { loadTheme } = themeSlice.actions;
export default themeSlice.reducer;