import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isShow: false,  // show modal delete both question and user

        isShowUpdateQuestion: false,
        isShowAddQuestion: false,
        currentQuestionId: undefined,

        isShowUpdateUser: false,
        isShowAddUser: false,
        currentUserId: undefined,

        isShowChangePassword: false
    },
    reducers: {
        // show modal delete both question and user
        showHideModal(state, action) {
            state.isShow = action.payload;
        },

        showHideModalUpdateQuestion(state, action) {
            state.isShowUpdateQuestion = action.payload;
        },
        showHideModalAddQuestion(state, action) {
            state.isShowAddQuestion = action.payload;
        },
        setCurrentQuestionId(state, action) {
            state.currentQuestionId = action.payload;
        },


        showHideModalUpdateUser(state, action) {
            state.isShowUpdateUser = action.payload;
        },
        showHideModalAddUser(state, action) {
            state.isShowAddUser = action.payload;
        },
        setCurrentUserId(state, action) {
            state.currentUserId = action.payload;
        }
    }
})

const { actions, reducer: modalReducer } = modalSlice;

export const { showHideModal, showHideModalUpdateQuestion, showHideModalAddQuestion, setCurrentQuestionId, showHideModalUpdateUser, showHideModalAddUser, setCurrentUserId } = actions;
export default modalReducer