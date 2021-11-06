import axios from 'axios'

const url = '/transactions'

export const createTransactionApi = (transaction) => axios.post(url, transaction)

export const removeTransactionApi = (id) => axios.delete(url + `/${id}`)

export const editTransactionApi = (id, transaction) => axios.patch(`${url}/${id}`, transaction)
