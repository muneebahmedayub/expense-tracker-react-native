import React from 'react'
import { StatusBar } from 'react-native'
import { Appbar } from 'react-native-paper'

const Header = ({ title }) => {
    return (
        <Appbar.Header>
            <StatusBar translucent backgroundColor='transparent' />
            <Appbar.Content title={title} />
        </Appbar.Header>
    )
}

export default Header

// const styles = StyleSheet.create({})
