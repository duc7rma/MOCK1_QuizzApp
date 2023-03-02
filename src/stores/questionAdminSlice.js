import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteQuestionsAdmin, fetchAllQuestionsAdmin, updateQuestionsAdmin } from "services/questions-admin-service"


export const fetchAllQuestionsAdminThunk = createAsyncThunk('questions/fetchAllQuestions', async (params) => {
    const res = await fetchAllQuestionsAdmin(params)
    return res.data
})

export const deleteQuestionThunk = createAsyncThunk('questions/deleteQuestion', async (id) => {
    const res = await deleteQuestionsAdmin(id)
    return res.data
})

export const updateQuestionThunk = createAsyncThunk('questions/updateQuestion', async (id, payload) => {
    const res = await updateQuestionsAdmin(id, payload)
    return res.data
})

const initState = {
    questions: [],
    loading: false,
    index: 0,
    total: 0,
    pageSize: 10,
    currentPage: 1,
    order: 'ASC',
    sortField: 'id',
    keywords: '',
    statusUpdateQuestion: false,
    statusDeleteQuestion: false,
    isDeleteQuestion: false,
}

const questionsAdminSlice = createSlice({
    name: 'questionsAdmin',
    initialState: initState,
    reducers: {
        setListQuestion: (state, action) => {
            state.questions = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setSortOrder: (state, action) => {
            state.order = action.payload
        },
        setSortField: (state, action) => {
            state.sortField = action.payload
        },
        setIsDeleteQuestion: (state, action) => {
            state.isDeleteQuestion = action.payload
        },
        setKeyWords: (state, action) => {
            state.keywords = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllQuestionsAdminThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAllQuestionsAdminThunk.fulfilled, (state, action) => {
                state.questions = action.payload.result;
                state.total = action.payload.total
                state.totalPages = action.payload.totalPages
                state.currentPage = action.payload.currentPage
                state.loading = false
                state.isDeleteQuestion = false
            })
            // .addCase(updateQuestion.pending, (state, action) => {
            //     state.statusUpdateQuestion = true
            // })
            // .addCase(updateQuestion.fulfilled, (state, action) => {
            //     state.statusUpdateQuestion = false
            //     state.questions = state.questions.map(el => {
            //         if (el.id === action.payload.id) return action.payload
            //         return el
            //     })
            // })
            .addCase(deleteQuestionThunk.pending, (state, action) => {
                state.statusDeleteQuestion = true
            })
            .addCase(deleteQuestionThunk.fulfilled, (state, action) => {
                state.statusDeleteQuestion = false
                state.isDeleteQuestion = true
            })
    }
})

const { actions, reducer: questionsAdminReducer } = questionsAdminSlice;

export const { setListQuestion, setCurrentPage, setSortOrder, setSortField, setKeyWords } = actions;
export default questionsAdminReducer;