import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    from: null,
    to: null,
    advancedSearch: false,
    term: null
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setFrom: (state, action) => {
            state.from = action.payload
        },
        setTo: (state, action) => {
            state.to = action.payload
        },
        setAdvancedSearch: (state, action) => {
            state.advancedSearch = action.payload
        },
        setTerm: (state, action) => {
            state.term = action.payload
        },
    }
})

export const { setFrom, setTo, setAdvancedSearch, setTerm } = searchSlice.actions;

// Selectors
export const selectFrom = (state) => state.search.from;
export const selectTo = (state) => state.search.to;
export const selectAdvancedSearch = (state) => state.search.advancedSearch;
export const selectTerm = (state) => state.search.term;

export default searchSlice.reducer;