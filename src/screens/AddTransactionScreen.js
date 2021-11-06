import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Alert, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { FAB, IconButton, TextInput, TouchableRipple } from 'react-native-paper'
import { primaryColor, white, transactionGreen, transactionRed } from '../constants'
import { useDispatch } from 'react-redux'
import { createTransaction, editTransaction } from '../redux/actions/transactionActions'

const AddTransactionScreen = ({ navigation, route }) => {
    if (route.params) {
        const { isEditing, description, transactionAmount, income } = route.params

        useEffect(() => {
            if (isEditing) {
                setDesc(description)
                setAmount(String(transactionAmount))
                setIsIncome(income)
            }
        }, [])
    }

    const [desc, setDesc] = useState('')
    const [amount, setAmount] = useState('')
    const [isIncome, setIsIncome] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const handleSubmit = async () => {
        if (desc && amount !== 0) {
            console.log(submitButton)
            setIsLoading(true)
            const now = dayjs().format()
            const transaction = {
                description: desc,
                amount,
                income: isIncome,
                updatedAt: now
            }
            if (route.params) {
                await dispatch(editTransaction(route.params._id, transaction))
            } else {
                await dispatch(createTransaction(transaction))
            }
            setIsLoading(false)
            navigation.goBack()
        } else {
            Alert.alert('Please Enter all fields...')
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.input}>
                    <TextInput
                        mode='outlined'
                        label='Description'
                        value={desc}
                        onChangeText={(textValue) => setDesc(textValue)}
                    />
                </View>
                <View style={styles.input}>
                    <TextInput
                        mode='outlined'
                        label='Amount'
                        keyboardType='numeric'
                        value={amount}
                        onChangeText={(textValue) => setAmount(textValue.replace(/[^0-9]/g, ''))}
                    />
                </View>
                <View style={styles.toggleView}>
                    <View style={[styles.toggleBorder, { marginLeft: 0, backgroundColor: isIncome ? transactionGreen : 'transparent' }]}>
                        <TouchableRipple
                            style={styles.ripple}
                            borderless
                            onPress={() => setIsIncome(true)}
                            rippleColor='rgba(0,0,0,0.3)'
                        >
                            <View style={styles.toggle}>
                                <Text style={{ color: isIncome ? white : 'black' }}>Income</Text>
                                <IconButton style={{ opacity: isIncome ? 1 : 0 }} disabled color={white} icon='check' />
                            </View>
                        </TouchableRipple>
                    </View>
                    <View style={[styles.toggleBorder, { marginRight: 0, backgroundColor: !isIncome ? transactionRed : 'transparent' }]}>
                        <TouchableRipple
                            style={styles.ripple}
                            borderless
                            onPress={() => setIsIncome(false)}
                            rippleColor='rgba(0,0,0,0.3)'
                        >
                            <View style={styles.toggle}>
                                <Text style={{ color: !isIncome ? white : 'black' }}>Expense</Text>
                                <IconButton style={{ opacity: isIncome ? 0 : 1 }} disabled color={white} icon='check' />
                            </View>
                        </TouchableRipple>
                    </View>
                </View>
                <FAB
                    style={styles.fab}
                    icon='send'
                    color='white'
                    onPress={handleSubmit}
                    loading={isLoading}
                />
            </View>
        </TouchableWithoutFeedback >
    )
}

export default AddTransactionScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50
    },
    input: {
        width: '80%',
        marginTop: 20,
    },
    fab: {
        backgroundColor: primaryColor,
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 16,
    },
    ripple: {
        borderRadius: 10,
        height: '100%',
        borderRadius: 10
    },
    toggleView: {
        height: 60,
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%'
    },
    toggleBorder: {
        borderWidth: 1,
        height: '100%',
        flex: 1,
        borderColor: 'black',
        borderRadius: 10,
        margin: 5,
    },
    toggle: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
})
