import { configureStore } from '@reduxjs/toolkit';
import tabReducer from './tabSlice';
import userReducer from './userSlice';
import questionsReducer from './questionSlice';



const store = configureStore({
    reducer: {
        user: userReducer,
        tab: tabReducer,
        questions: questionsReducer
    }
})

export default store