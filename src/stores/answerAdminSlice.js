import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteAnswerAdmin, getDetailsAnswer, updateAnswerAdmin } from "services/answer-admin-service"

export const deleteAnswerThunk = createAsyncThunk('answers/deleteAnswer', async (id) => {
    const res = await deleteAnswerAdmin(id)
    return res.data
})

export const updateAnswerThunk = createAsyncThunk('answers/updateAnswer', async (payload) => {
    const res = await updateAnswerAdmin(payload)
    return res.data
})

export const addAnswerThunk = createAsyncThunk('answers/addAnswer', async (payload) => {
    const res = await getDetailsAnswer(payload)
    return res.data
})

const initState = {
    answers: [],
    loadingAdd: false,
    loadingUpdate: false,
    loadingDelete: false,
    isEditAnswer: false,
}

const answersAdminSlice = createSlice({
    name: 'answerAdmin',
    initialState: initState,
    reducers: {
        setListAnswer: (state, action) => {
            state.answers = action.payload
        },
        addAnswer: (state, action) => {
            let newAnswer = [...state.answers, action.payload]
            state.answers = newAnswer
        },
        deleteAnswer: (state, action) => {
            const index = state.answers.findIndex(answer => answer.id === action.payload)
            index > -1 && state.answers.splice(index, 1)
        },
        setIsEditAnswer: (state, action) => {
            state.isEditAnswer = action.payload
        },
        updateTitleAnswer: (state, action) => {
            const index = state.answers.findIndex(answer => answer.id === action.payload.id)
            state.answers[index].content = action.payload.content
        },
        toggleCheckBoxAnswer: (state, action) => {
            const index = state.answers.findIndex(answer => answer.id === action.payload.id)
            state.answers[index].is_correct = action.payload.is_correct
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteAnswerThunk.pending, (state, action) => {
                state.loadingDelete = true
            })
            .addCase(deleteAnswerThunk.fulfilled, (state, action) => {
                state.loadingDelete = false
            })

            .addCase(updateAnswerThunk.pending, (state, action) => {
                state.loadingUpdate = true
            })
            .addCase(updateAnswerThunk.fulfilled, (state, action) => {
                state.loadingUpdate = false
            })

            .addCase(addAnswerThunk.pending, (state, action) => {
                state.loadingAdd = true
            })
            .addCase(addAnswerThunk.fulfilled, (state, action) => {
                state.loadingAdd = false
            })
    }
})

const { actions, reducer: answersAdminReducer } = answersAdminSlice;

export const { setListAnswer, addAnswer, deleteAnswer, setIsEditAnswer, updateTitleAnswer, toggleCheckBoxAnswer } = actions;
export default answersAdminReducer;