import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { FlatList, RefreshControl, StatusBar, StyleSheet, Text, View } from 'react-native'
import { FAB } from 'react-native-paper'
import Transaction from '../components/Transaction'
import { primaryColor } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { loadTransactions } from '../redux/actions/transactionActions'
import numberWithCommas from '../utils/format'
import Loader from '../components/Loader'
import { loadUser } from '../redux/actions/authActions'
import LoadingScreen from './LoadingScreen'

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const userTransactions = useSelector(state => state.auth.user.transactions)
    const transactions = useSelector(state => state.transactions)
    const loadData = async () => {
        await dispatch(loadTransactions(userTransactions))
    }
    useEffect(() => {
        loadData()
    }, [])
    const incomeObj = transactions.filter(obj => obj.income === true)
    const incomeAmounts = incomeObj.map(obj => obj.amount)
    const income = incomeAmounts.reduce((acc, item) => acc + item, 0)

    const expenseObj = transactions.filter(obj => obj.income === false)
    const expenseAmounts = expenseObj.map(obj => obj.amount)
    const expense = expenseAmounts.reduce((acc, item) => acc + item, 0)

    const total = parseFloat((income - expense).toFixed(2))

    const onRefresh = async () => {
        setIsRefreshing(true);
        await dispatch(loadUser());
        await loadData();
        setIsRefreshing(false);
    }
    if(isRefreshing) return <LoadingScreen />

    return (
        <View style={styles.container}>
            {isLoading ? <Loader /> : null}
            <StatusBar translucent backgroundColor={primaryColor} barStyle='light-content' />
            <View style={styles.currentBal}>
                <Text style={styles.currentBalText}>Current Balance</Text>
                <Text style={styles.currentBalValueText}>${numberWithCommas(total)}</Text>
            </View>
            <View style={styles.incomeExpense}>
                <View style={styles.income}>
                    <Text style={styles.incomeText}>Income</Text>
                    <Text style={styles.incomeValueText}>${numberWithCommas(income)}</Text>
                </View>
                <View style={styles.expense}>
                    <Text style={styles.expenseText}>Expense</Text>
                    <Text style={styles.expenseValueText}>${numberWithCommas(expense)}</Text>
                </View>
            </View>
            <View style={styles.transactionHistory}>
                <FlatList
                    data={transactions}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    renderItem={({ item, index }) => {
                        return (
                            <Transaction
                                transaction={item}
                                isLastElement={index === transactions.length - 1}
                                setIsLoading={setIsLoading}
                                navigation={navigation}
                            />
                        )
                    }}
                    keyExtractor={transaction => String(transaction._id)}
                />
            </View>
            <LinearGradient
                style={styles.linearGradient}
                colors={['transparent', 'rgba(0,0,0,0.8)']}
            >
                <FAB
                    style={styles.fab}
                    icon='plus'
                    onPress={() => navigation.navigate('Add Transaction')}
                />
            </LinearGradient>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    currentBal: {
        margin: 50,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    currentBalText: {
        fontSize: 28,
        color: 'rgb(0,0,255)'
    },
    currentBalValueText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'rgb(0,0,0)'
    },
    incomeExpense: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    income: {
        alignItems: 'center',
    },
    incomeText: {
        fontSize: 24,
        color: 'rgb(0,200,0)'
    },
    incomeValueText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    expense: {
        alignItems: 'center',
    },
    expenseText: {
        fontSize: 24,
        color: 'rgb(255,0,0)'
    },
    expenseValueText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    transactionHistory: {
        width: '100%',
        marginTop: 50,
        flex: 1,
        backgroundColor: 'transparent',
    },
    linearGradient: {
        width: '100%',
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    fab: {
        backgroundColor: primaryColor,
        position: 'absolute',
        margin: 16,
        bottom: 0,
        right: 0
    }
})
