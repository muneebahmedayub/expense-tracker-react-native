import React from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { IconButton } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { transactionGreen, transactionRed, white } from '../constants'
import { deleteTransaction } from '../redux/actions/transactionActions'
import numberWithCommas from '../utils/format'

const Transaction = ({ navigation, transaction, isLastElement, setIsLoading }) => {
    const dispatch = useDispatch()
    const { description, amount, income, _id } = transaction

    const handleDelete = async () => {
        setIsLoading(true)
        swipeRef.current.close()
        await dispatch(deleteTransaction(transaction._id))
        setIsLoading(false)
    }
    const handleEdit = () => {
        swipeRef.current.close()
        navigation.navigate('Add Transaction', { isEditing: true, description, transactionAmount: amount, income, _id })
    }
    const leftSwipe = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })

        return (
            <Animated.View
                style={[
                    styles.leftSwipeContainer,
                    { marginBottom: isLastElement ? 100 : 5 },
                    { transform: [{ scale: scale }] }
                ]}
            >
                <IconButton
                    icon='delete'
                    size={40}
                    color='red'
                    onPress={handleDelete}
                />

            </Animated.View>
        )
    }
    const rightSwipe = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        })
        return (
            <Animated.View
                style={[
                    styles.leftSwipeContainer,
                    { marginBottom: isLastElement ? 100 : 5 },
                    { transform: [{ scale: scale }] }
                ]}
            >
                <IconButton
                    icon='pencil'
                    size={40}
                    color='blue'
                    onPress={handleEdit}
                />
            </Animated.View>
        )
    }
    const swipeRef = React.useRef()
    return (
        <>
            <Swipeable
                containerStyle={styles.swipeContainer}
                renderLeftActions={leftSwipe}
                renderRightActions={rightSwipe}
                ref={swipeRef}
                friction={2}
            >
                <View
                    style={[styles.container, {
                        backgroundColor: income ? transactionGreen : transactionRed,
                        marginBottom: isLastElement ? 100 : 5
                    }]}
                >
                    <Text style={styles.description}>{description}</Text>
                    <Text style={styles.amount}>$ {numberWithCommas(amount)}</Text>
                </View>
            </Swipeable>
        </>
    )
}

export default Transaction

const styles = StyleSheet.create({
    swipeContainer: {
        width: '90%',
        alignSelf: 'center',
        overflow: 'visible'
    },
    leftSwipeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'center',
        padding: 15,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        elevation: 5,
    },
    description: {
        flex: 6,
        fontSize: 18,
        color: white,
        margin: 5
    },
    amount: {
        flex: 6,
        color: white,
        fontSize: 18,
        margin: 5,
        textAlign: 'right',
    },
})
