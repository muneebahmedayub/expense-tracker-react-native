import React from 'react';
import { View, ActivityIndicator } from "react-native";
import { primaryColor } from '../constants';

const LoadingScreen = () => {
	return (
      	<View style={{ flex: 1, justifyContent: "center"}}>
			<ActivityIndicator size="large" color={primaryColor} />
      	</View>
    );
}

export default LoadingScreen