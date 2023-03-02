import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isShow: false,
        currentQuestionId: undefined,
        currentUserId: undefined,
    },
    reducers: {
        showHideModal(state, action) {
            state.isShow = action.payload;
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

export const { showHideModal, setCurrentQuestionId, setCurrentUserId } = actions;
export default modalReducer