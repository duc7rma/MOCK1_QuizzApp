import { createSlice } from '@reduxjs/toolkit'

const tabSlice = createSlice({
    name: 'tab',
    initialState: 'go-to-play',
    reducers: {
        changeTab(state, action) {
            return action.payload;
        },

    }
})

const { actions, reducer: tabReducer } = tabSlice;

export const { changeTab } = actions;
export default tabReducer