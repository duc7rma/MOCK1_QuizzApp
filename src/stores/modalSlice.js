import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isShow: false,  // show modal delete
        isShowUpdateQuestion: false,
        currentQuestionId: undefined,
        currentUserId: undefined,
    },
    reducers: {
        showHideModal(state, action) {
            state.isShow = action.payload;
        },
        showHideModalUpdateQuestion(state, action) {
            state.isShowUpdateQuestion = action.payload;
        },
        setCurrentQuestionId(state, action) {
            state.currentQuestionId = action.payload;
        },
        setCurrentUserId(state, action) {
            state.currentUserId = action.payload;
        }
    }
})

const { actions, reducer: modalReducer } = modalSlice;

export const { showHideModal, showHideModalUpdateQuestion, setCurrentQuestionId, setCurrentUserId } = actions;
export default modalReducer