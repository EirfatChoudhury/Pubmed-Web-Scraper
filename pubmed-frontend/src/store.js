import { configureStore} from '@reduxjs/toolkit'
import searchReducer from './slices/searchSlice'
import articleReducer from './slices/articleSlice'

const store = configureStore({
    reducer: { 
        search: searchReducer,
        article: articleReducer
    }
})

export default store