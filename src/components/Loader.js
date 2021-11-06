import React from 'react';
import { View, ActivityIndicator } from "react-native";
import { primaryColor } from '../constants';

const Loader = () => {
    return (
        <View style={{
            height: '100%',
            width: '100%',
            justifyContent: "center",
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0, 0.3)',
            zIndex: 10,
            elevation: 10,
            transform: [{scale: 1.5}],
            position: 'absolute',
            top: 0
        }}>
            <ActivityIndicator size="large" color={primaryColor} />
        </View>
    );
}

export default Loader