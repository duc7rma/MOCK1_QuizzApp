import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchListQuestions } from "services/questions-service";

const initState = {
    questions: [],
    loading: false,
    index: 1,
    total: 0,
    listQuestionsSubmit: [],
}

export const fetchListQuestionsThunk = createAsyncThunk('question/fetchListQuestions', async (total, thunkAPI) => {
    const res = await fetchListQuestions(total);
    return res.data
})


const questionSlice = createSlice({
    name: 'question',
    initialState: initState,
    reducers: {
        setListQuestion: (state, action) => {
            state.questions = action.payload
        },
        setIndex: (state, action) => {
            state.index = action.payload
        },
        resetQuestions: (state, action) => {
            state.questions = []
            state.status = false
            // state.index = 0
            state.total = 0
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchListQuestionsThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchListQuestionsThunk.fulfilled, (state, action) => {
                state.loading = false
                state.questions = action.payload
                state.total = action.payload.length
            })
    }
})

const { actions, reducer: questionsReducer } = questionSlice;

export const { setListQuestion, setIndex, resetQuestions } = actions;
export default questionsReducer;