import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchListQuestions, submitQuestions } from "services/questions-service";

const initState = {
    questions: [],
    loading: false,
    index: 1,
    total: 0,
    loadingSubmit: false,
    questionsSubmitted: [],
    totalScore: 0,
    isSubmitted: false
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
        resetQuestions: (state) => {
            return initState
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
        setIsSubmitted: (state, action) => {
            state.isSubmitted = action.payload
        }
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
                state.isSubmitted = false
            })
            .addCase(submitQuestionsThunk.rejected, (state) => {
                state.loadingSubmit = true
                state.isSubmitted = false
            })
            .addCase(submitQuestionsThunk.fulfilled, (state, action) => {
                state.isSubmitted = true
                state.loadingSubmit = false
                state.questionsSubmitted = action.payload.listQuestionChecked
                state.totalScore = action.payload.totalScore
            })
    }
})

const { actions, reducer: questionsReducer } = questionSlice;

export const { setListQuestion, setIndex, resetQuestions, setAnswers, setIsSubmitted } = actions;
export default questionsReducer;