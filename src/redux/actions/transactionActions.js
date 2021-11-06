import * as actionTypes from './actionTypes'
import * as transactionApi from '../../api/transactionApi'
import dayjs from 'dayjs'

export const loadTransactions = (transactions) => {
    const sortedTransactions = transactions.sort((a, b) => {
        return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix()
    })
    return {
        type: actionTypes.LOAD_TRANSACTION,
        payload: sortedTransactions
    }
}

export const createTransaction = (transaction) => async (dispatch) => {
    try {
        const { data } = await transactionApi.createTransactionApi(transaction)
        dispatch({ type: actionTypes.CREATE_TRANSACTION, payload: data })
    } catch (err) {
        console.log(err.message)
    }
}

export const deleteTransaction = (id) => async (dispatch) => {
    try {
        await transactionApi.removeTransactionApi(id)
        dispatch({ type: actionTypes.DELETE_TRANSACTION, payload: id })
    } catch (err) {
        console.log(err.message)
    }
}

export const editTransaction = (id, transaction) => async (dispatch) => {
    try {
        const { data } = await transactionApi.editTransactionApi(id, transaction)
        dispatch({ type: actionTypes.EDIT_TRANSACTION, payload: data })
    } catch (err) {
        console.log(err)
    }
}