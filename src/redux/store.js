import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer'
import createSecureStore from "redux-persist-expo-securestore";

const storage = createSecureStore()

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = createStore(persistedReducer, compose(applyMiddleware(thunk)))
    let persistor = persistStore(store)
    return {
        store,
        persistor
    }
}