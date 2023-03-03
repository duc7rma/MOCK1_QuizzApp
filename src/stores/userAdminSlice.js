import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { addUserAdmin, deleteUserAdmin, fetchAllUserAdmin, getDetailsUserAdmin, updateUserAdmin } from "services/user-admin-service"


export const fetchAllUsersAdminThunk = createAsyncThunk('user/fetchAllUsers', async (params) => {
    const res = await fetchAllUserAdmin(params)
    return res.data
})

export const deleteUserThunk = createAsyncThunk('user/deleteUser', async (id) => {
    const res = await deleteUserAdmin(id)
    return res.data
})

export const updateUserThunk = createAsyncThunk('user/updateUser', async (payload, thunkAPI) => {
    const res = await updateUserAdmin(payload)
    return res.data
})

export const addUserThunk = createAsyncThunk('user/addUser', async (payload) => {
    const res = await addUserAdmin(payload)
    return res.data
})

export const getDetailsUserThunk = createAsyncThunk('user/getDetailsUser', async (id) => {
    const res = await getDetailsUserAdmin(id)
    return res.data
})

const initState = {
    users: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    order: 'ASC',
    sortField: 'id',
    role: '',
    keywords: '',

    currentUserDetail: {},

    loading: false,
    isLoadingAdd: false,
    isLoadingUpdate: false,
    isLoadingDelete: false,

}

const userAdminSlice = createSlice({
    name: 'userAdmin',
    initialState: initState,
    reducers: {
        setListUsers: (state, action) => {
            state.users = action.payload
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
        setKeyWords: (state, action) => {
            state.keywords = action.payload
        },
        setRole: (state, action) => {
            state.role = action.payload
        },
        setCurrentUser: (state, action) => {
            state.currentUserDetail = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsersAdminThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAllUsersAdminThunk.fulfilled, (state, action) => {
                state.users = action.payload.result;
                state.total = action.payload.total
                state.totalPages = action.payload.totalPages
                state.currentPage = action.payload.currentPage
                state.loading = false
            })

            .addCase(deleteUserThunk.pending, (state, action) => {
                state.isLoadingDelete = true
            })
            .addCase(deleteUserThunk.fulfilled, (state, action) => {
                state.isLoadingDelete = false
            })

            .addCase(updateUserThunk.pending, (state, action) => {
                state.isLoadingUpdate = true
            })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                state.isLoadingUpdate = false
            })

            .addCase(addUserThunk.pending, (state, action) => {
                state.isLoadingAdd = true
            })
            .addCase(addUserThunk.fulfilled, (state, action) => {
                state.isLoadingAdd = false
            })
    }
})

const { actions, reducer: userAdminReducer } = userAdminSlice;

export const { setListUsers, setCurrentPage, setSortOrder, setSortField, setKeyWords, setCurrentUser, setRole } = actions;
export default userAdminReducer;