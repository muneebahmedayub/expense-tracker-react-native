import React, { useEffect, useState } from "react";
import { StatusBar } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "./screens/AuthScreen";
import HomeScreen from "./screens/HomeScreen";
import { primaryColor, white } from './constants';
import AddTransactionScreen from "./screens/AddTransactionScreen";
import axiosInterceptor from "./utils/axios-interceptor";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, loadUser, logout } from "./redux/actions/authActions";
import { IconButton } from "react-native-paper";

axiosInterceptor()

const Stack = createNativeStackNavigator();

export default function Index() {
    const dispatch = useDispatch()
    const { isAuthenticated, user } = useSelector(state => state.auth)
    const defaultScreenOptions = {
        headerStyle: {
            backgroundColor: primaryColor,
        },
        headerTintColor: white,
    }
    const addTransactionOptions = (route) => {
        if (route.params) {
            return { headerTitle: route.params.isEditing ? 'Edit Transaction' : 'Add Transaction' }
        }
    }
    const headerActions = () => {
        return (
            <>
                <IconButton icon='logout' color='white' onPress={() => dispatch(logout())} />
                <IconButton icon='account-remove' color='white' onPress={() => dispatch(deleteUser(user._id))} />
            </>
        )
    }
    useEffect(() => {
        dispatch(loadUser())
    }, [])
    return (
        <>
            <StatusBar translucent backgroundColor='rgba(0,0,0,0)' barStyle='light-content' />
            <NavigationContainer>
                <Stack.Navigator screenOptions={defaultScreenOptions}>
                    {!isAuthenticated ?
                        <>
                            <Stack.Screen name='Auth' component={AuthScreen} options={{ headerShown: false }} />
                        </>
                        :
                        (
                            <>
                                <Stack.Screen name='Home' component={HomeScreen} options={{ headerBackVisible: false, headerRight: headerActions, headerTitle: user.username }} />
                                <Stack.Screen name='Add Transaction' component={AddTransactionScreen} options={addTransactionOptions} />
                            </>
                        )
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}