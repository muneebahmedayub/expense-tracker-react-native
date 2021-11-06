import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Button, Keyboard, TouchableWithoutFeedback, StatusBar } from 'react-native'
import { Headline, TextInput, Divider } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import { green, primaryColor } from '../constants'
import { login, signup } from '../redux/actions/authActions'

const AuthScreen = () => {
    const dispatch = useDispatch()
    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const submitHandler = async () => {
        setIsLoading(true)
        console.log('submit')
        const body = {
            username,
            password
        }
        if (isLogin) {
            await dispatch(login(body))
        } else {
            await dispatch(signup(body))
        }
        setIsLoading(false)
    }
    const handleShowPassword = () => {
        setShowPassword((prev) => !prev)
    }
    useEffect(() => {
        return () => {
            setIsLoading(false)
        }
    }, [])
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <StatusBar translucent barStyle='dark-content' />
                {isLoading ? <Loader /> : null}
                <View style={styles.headline}>
                    <Headline>{isLogin ? 'Login' : 'Register'}</Headline>
                </View>
                <View style={styles.input}>
                    <TextInput
                        label='Username'
                        value={username}
                        onChangeText={(textValue) => setUsername(textValue)}
                    />
                </View>
                <View style={styles.input}>
                    <TextInput
                        label='Password'
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={(textValue) => setPassword(textValue)}
                        right={<TextInput.Icon name={showPassword ? 'eye-off' : 'eye'} onPress={handleShowPassword} />}
                    />
                </View>
                <View style={styles.submitButtonView}>
                    <Button
                        title='Submit'
                        color={primaryColor}
                        onPress={submitHandler}
                    />
                </View>
                <View style={styles.newAccView}>
                    <Divider style={styles.divider} />
                    <View style={styles.newAccBtnWidthView}>
                        <Button
                            title={isLogin ? 'Create New Account' : 'Already have an account?'}
                            color={green}
                            onPress={() => setIsLogin((prev) => !prev)}
                        />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default AuthScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headline: {
        height: 100,
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: 30,
        width: '80%',
        marginBottom: 50
    },
    submitButtonView: {
        width: '80%',
        margin: 10,
        borderRadius: 5,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        elevation: 5,
    },
    newAccView: {
        width: '90%',
        flex: 1,
        margin: 20,
    },
    newAccBtnWidthView: {
        width: 250,
        alignSelf: 'center',
        borderRadius: 5,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        elevation: 5,
    },
    divider: {
        marginBottom: 20
    }
});