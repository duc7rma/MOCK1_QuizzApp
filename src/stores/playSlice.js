import { createSlice } from "@reduxjs/toolkit";


const initState = {

    listQuestionsSubmit: [],
    currentQuestionId: 0
}

const playSlice = createSlice({
    name: 'play',
    initialState: initState,
    reducers: {
        setCurrentQuestionId: (state, action) => {
            state.currentQuestionId = action.payload
        }
    }
})

const { actions, reducer: playReducer } = playSlice;

export const { setCurrentQuestionId } = actions;
export default playReducer;