import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Index from './src/index'
import reduxStore from './src/redux/store'
import LoadingScreen from './src/screens/LoadingScreen'

export default function App() {
  const { store, persistor } = reduxStore()
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <Index />
      </PersistGate>
    </Provider>
  )
}