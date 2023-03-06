import { configureStore } from '@reduxjs/toolkit';
import answersAdminReducer from './answerAdminSlice';
import modalReducer from './modalSlice';
import questionsAdminReducer from './questionAdminSlice';
import questionsReducer from './questionSlice';
import tabReducer from './tabSlice';
import userAdminReducer from './userAdminSlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        tab: tabReducer,
        questions: questionsReducer,
        questionsAdmin: questionsAdminReducer,
        modal: modalReducer,
        answerAdmin: answersAdminReducer,
        userAdmin: userAdminReducer,
    }
})

export default store