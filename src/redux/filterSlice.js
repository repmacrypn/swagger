import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { filterAPI } from '../api/api'

const initialState = {
    status: 'idle',
    error: null,
    customers: [],
    countries: [],
    industries: [],
    usersFullNameArray: [],
    totalCount: 0,
    itemsPerPage: 12
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(findCustomers.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(findCustomers.fulfilled, (state, action) => {
                const { data, total } = action.payload
                state.status = 'succeeded'
                state.customers = data
                state.totalCount = total
            })
            .addCase(findCustomers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.countries = action.payload
            })
            .addCase(fetchIndustries.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.industries = action.payload
            })
            .addCase(getUserName.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.usersFullNameArray.push(action.payload)
            })
    }
})

export const fetchCountries = createAsyncThunk('filter/fetchCountries', async () => {
    return await filterAPI.fetchCountries()
})

export const fetchIndustries = createAsyncThunk('filter/fetchIndustries', async () => {
    return await filterAPI.fetchIndustries()
})

export const findCustomers = createAsyncThunk('filter/findCustomers',
    async (apiObj) => {
        return await filterAPI.findCustomers(apiObj)
    })

export const getUserName = createAsyncThunk('filter/getUserName', async (userId) => {
    const data = await filterAPI.getUserName(userId)
    return { userId, userName: data }
})

export const selectTotalCount = (state) => state.filter.totalCount
export const selectItemsPerPage = (state) => state.filter.itemsPerPage

/* export const { } = filterSlice.actions */

export default filterSlice.reducer