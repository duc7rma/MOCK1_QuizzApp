import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchListQuestions, submitQuestions } from "services/questions-service";

const initState = {
    questions: [],
    loading: false,
    index: 1,
    total: 0,
    loadingSubmit: false,
    questionsSubmitted: [],
    totalScore: 0
}

export const fetchListQuestionsThunk = createAsyncThunk('question/fetchListQuestions', async (total) => {
    const res = await fetchListQuestions(total);
    return res.data
})


export const submitQuestionsThunk = createAsyncThunk('question/submitQuestions', async (payload) => {
    const res = await submitQuestions(payload);
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
            state.index = 1
            state.total = 0
        },
        setAnswers: (state, action) => {
            state.questions = state.questions.map(question => {
                if (question.id === action.payload.id) {
                    return action.payload
                } else {
                    return question
                }
            })
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

            .addCase(submitQuestionsThunk.pending, (state) => {
                state.loadingSubmit = true
            })
            .addCase(submitQuestionsThunk.fulfilled, (state, action) => {
                console.log(action.payload)
                state.loadingSubmit = false
                state.questionsSubmitted = action.payload.listQuestionChecked
                state.totalScore = action.payload.totalScore
            })
    }
})

const { actions, reducer: questionsReducer } = questionSlice;

export const { setListQuestion, setIndex, resetQuestions, setAnswers } = actions;
export default questionsReducer;