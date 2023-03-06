import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addQuestionsAdmin, deleteQuestionsAdmin, fetchAllQuestionsAdmin, getDetailsQuestionAdmin, updateQuestionsAdmin } from "services/questions-admin-service"


export const fetchAllQuestionsAdminThunk = createAsyncThunk('questions/fetchAllQuestions', async (params) => {
    const res = await fetchAllQuestionsAdmin(params)
    return res.data
})

export const deleteQuestionThunk = createAsyncThunk('questions/deleteQuestion', async (id) => {
    const res = await deleteQuestionsAdmin(id)
    return res.data
})

export const updateQuestionThunk = createAsyncThunk('questions/updateQuestion', async (payload, thunkAPI) => {
    const res = await updateQuestionsAdmin(payload)
    return res.data
})

export const addQuestionThunk = createAsyncThunk('questions/addQuestion', async (payload) => {
    const res = await addQuestionsAdmin(payload)
    return res.data
})

export const getDetailsQuestionThunk = createAsyncThunk('questions/getDetailsQuestion', async (id) => {
    const res = await getDetailsQuestionAdmin(id)
    return res.data
})

const initState = {
    questions: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    order: 'ASC',
    sortField: 'id',
    keywords: '',
    currentQuestionDetail: {},

    loading: false,
    isLoadingAdd: false,
    isLoadingUpdate: false,
    isLoadingDelete: false,

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
        setPageSize: (state, action) => {
            state.pageSize = action.payload
        },
        setSortOrder: (state, action) => {
            state.order = action.payload
        },
        setSortField: (state, action) => {
            state.sortField = action.payload
        },
        setKeyWords: (state, action) => {
            state.keywords = action.payload
        },
        setCurrentQuestion: (state, action) => {
            state.currentQuestionDetail = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllQuestionsAdminThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAllQuestionsAdminThunk.fulfilled, (state, action) => {
                state.questions = action.payload.result;
                state.total = action.payload.total
                state.currentPage = action.payload.currentPage
                state.loading = false
            })

            .addCase(deleteQuestionThunk.pending, (state, action) => {
                state.isLoadingDelete = true
            })
            .addCase(deleteQuestionThunk.fulfilled, (state, action) => {
                state.isLoadingDelete = false
            })

            .addCase(updateQuestionThunk.pending, (state, action) => {
                state.isLoadingUpdate = true
            })
            .addCase(updateQuestionThunk.fulfilled, (state, action) => {
                state.isLoadingUpdate = false
            })

            .addCase(addQuestionThunk.pending, (state, action) => {
                state.isLoadingAdd = true
            })
            .addCase(addQuestionThunk.fulfilled, (state, action) => {
                state.isLoadingAdd = false
            })
    }
})

const { actions, reducer: questionsAdminReducer } = questionsAdminSlice;

export const { setListQuestion, setCurrentPage, setSortOrder, setSortField, setKeyWords, setCurrentQuestion, setPageSize } = actions;
export default questionsAdminReducer;