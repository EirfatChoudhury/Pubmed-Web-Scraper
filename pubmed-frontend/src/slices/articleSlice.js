import { createSlice } from "@reduxjs/toolkit";
import articleService from '../services/article'

const initialState = [];

export const articleSlice = createSlice({
    name: "article",
    initialState,
    reducers: {
        getArticles: (state, action) => {
            return action.payload
        }
    }
})

export const { getArticles} = articleSlice.actions;

// Selectors
export const selectArticles = (state) => state.article

export const postSearch = ( parameters ) => {
    const minDate = parameters.from
    const maxDate = parameters.to
    const field = parameters.advancedSearch === false ? 'all' : 'tiab'
    const term = parameters.term

    if (term === null) return

    const searchContent = {
        minDate,
        maxDate,
        field,
        term
    }

    return async dispatch => {
        const articles = await articleService.getAll(searchContent)
        dispatch(getArticles(articles))
    }
}

export default articleSlice.reducer;