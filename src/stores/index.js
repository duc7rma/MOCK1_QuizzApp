import { configureStore } from '@reduxjs/toolkit';
import tabReducer from './tabSlice';
import userReducer from './userSlice';
import questionsReducer from './questionSlice';
import questionsAdminReducer from './questionAdminSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        tab: tabReducer,
        questions: questionsReducer,
        questionsAdmin: questionsAdminReducer
    }
})

export default store