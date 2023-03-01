import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import Cookies from "js-cookie"
import { fetchAllQuestionsAdmin } from "services/questions-admin-service"
// import { toastCss } from "../components/StyleComponent/StyleCompoent"
// import { deleteQuestionAPI, updateQuestionAPI } from "../config/API"
// import axiosInstance from "../config/customAxios"
// import { ACCESS_TOKEN_KEY } from "../config/token"

export const fetchAllQuestionsAdminThunk = createAsyncThunk('questions/fetchAllQuestions', async (params) => {
    const res = await fetchAllQuestionsAdmin(params)
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
                console.log('results: ', action.payload);
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
        // .addCase(deleteQuestion.pending, (state, action) => {
        //     state.statusDeleteQuestion = true
        // })
        // .addCase(deleteQuestion.fulfilled, (state, action) => {
        //     state.statusDeleteQuestion = false
        //     state.isDeleteQuestion = true
        // })
    }
})

// export const updateQuestion = createAsyncThunk('quesitons/updateQuestion', async (values) => {
//     try {
//         const data = {
//             title: values.keywords,
//             thumbnail_link: values.thumbnail_link
//         }
//         const res = await axiosInstance.patch(
//             updateQuestionAPI + values.id, data, { headers: { "Authorization": `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } }
//         )
//         toast.success(res.data.message, toastCss)
//         return res.data.data
//     } catch (error) {
//         toast.success('Update failed', toastCss)
//     }

// })

// export const deleteQuestion = createAsyncThunk('questions/deleteQuestion', async (idQuestion) => {
//     try {
//         const res = await axiosInstance.delete(deleteQuestionAPI + idQuestion, { headers: { "Authorization": `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } })
//         toast.success(res.data.message, toastCss)
//         return idQuestion
//     } catch (err) {
//         toast.error('Delete failed', toastCss)
//     }
// })

const { actions, reducer: questionsAdminReducer } = questionsAdminSlice;

export const { setListQuestion, setCurrentPage, setSortOrder, setSortField, setKeyWords } = actions;
export default questionsAdminReducer;