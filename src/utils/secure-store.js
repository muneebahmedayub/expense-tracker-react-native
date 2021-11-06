import * as SecureStore from 'expo-secure-store'

export const getItem = async (key) => {
    return await SecureStore.getItemAsync(key)
}

export const removeItem = async (key) => {
    await SecureStore.deleteItemAsync(key)
}

export const setItem = async (key, value) => {
    await SecureStore.setItemAsync(key, value)
}