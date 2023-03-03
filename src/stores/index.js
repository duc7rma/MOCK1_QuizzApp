import { configureStore } from '@reduxjs/toolkit';
import tabReducer from './tabSlice';
import userReducer from './userSlice';
import questionsReducer from './questionSlice';
import questionsAdminReducer from './questionAdminSlice';
import modalReducer from './modalSlice';
import answersAdminReducer from './answerAdminSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        tab: tabReducer,
        questions: questionsReducer,
        questionsAdmin: questionsAdminReducer,
        modal: modalReducer,
        answerAdmin: answersAdminReducer
    }
})

export default store