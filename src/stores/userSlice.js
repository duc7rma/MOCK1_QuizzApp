import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';

import { changePassword, getMyProfile, signIn } from 'services/auth-service';

export const signInThunk = createAsyncThunk('sign-in', async (payload) => {
    const res = await signIn(payload)
    return res.data
})

export const getMyProfileThunk = createAsyncThunk('my-profile', async () => {
    const res = await getMyProfile()
    return res.data
})

export const changePasswordThunk = createAsyncThunk('change-password', async (payload) => {
    const res = await changePassword(payload)
    return res.data
})


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        hasAuth: false,
        loading: false,
    },
    reducers: {
        addUser(state, action) {
            state.user = action.payload;
        },
        updateAvatar(state, action) {
            state.user = { ...state.user, avatar_link: action.payload }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signInThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(signInThunk.rejected, (state) => {
                state.loading = false
            })
            .addCase(signInThunk.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.loading = false;
                state.hasAuth = true;

                localStorage.setItem('hasAuth', true);
                localStorage.setItem('roles', JSON.stringify(action.payload.roles));
            })

            .addCase(getMyProfileThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(getMyProfileThunk.rejected, (state) => {
                state.loading = false
            })
            .addCase(getMyProfileThunk.fulfilled, (state, action) => {
                state.user = action.payload;
                state.hasAuth = false;
            })

            .addCase(changePasswordThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(changePasswordThunk.rejected, (state) => {
                state.loading = false
            })
            .addCase(changePasswordThunk.fulfilled, (state, action) => {
                state.hasAuth = false;
            })
    }
})

const { actions, reducer: userReducer } = userSlice;

export const { addUser, updateAvatar } = actions;
export default userReducer