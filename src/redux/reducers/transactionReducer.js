import * as actionTypes from '../actions/actionTypes'

export default (state = [], action) => {
    switch (action.type) {
        case actionTypes.LOAD_TRANSACTION:
            return action.payload;
        case actionTypes.CREATE_TRANSACTION:
            return [action.payload, ...state]
        case actionTypes.DELETE_TRANSACTION:
            const transactions = state.filter((transaction) => {
                return transaction._id !== action.payload
            })
            return transactions
        case actionTypes.EDIT_TRANSACTION:
            const filteredState = state.filter((transaction) => transaction._id !== action.payload._id)
            return [action.payload, ...filteredState]
        default:
            return state;
    }
}