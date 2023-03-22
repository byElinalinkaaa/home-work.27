import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    addToBasketReq,
    deleteBasketItemRebq,
    getBasketReq,
    updateBasketItemReq,
} from '../../api/basketService'

export const getBasket = createAsyncThunk(
    'basket/getBasket',
    async (_, { rejectWithValue, getState }) => {
        try {
            const { token } = getState().auth
            const { data } = await getBasketReq(token)
            return data.data.items
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const addToBasket = createAsyncThunk(
    'basket/addNewBasket',
    async (newItem, { dispatch, rejectWithValue, getState }) => {
        try {
            const { token } = getState().auth
            await addToBasketReq(newItem, token)
            dispatch(getBasket())
        } catch (error) {
            rejectWithValue(error)
        }
    }
)
export const updateBasketItem = createAsyncThunk(
    'basket/updateBasket',
    async ({ id, amount }, { dispatch, rejectWithValue }) => {
        try {
            await updateBasketItemReq(id, amount)
            dispatch(getBasket())
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const deleteBasketItem = createAsyncThunk(
    'basket/deleteBasket',
    async (id, { dispatch, rejectWithValue }) => {
        try {
            await deleteBasketItemRebq(id)
            dispatch(getBasket())
        } catch (error) {
            rejectWithValue(error)
        }
    }
)
