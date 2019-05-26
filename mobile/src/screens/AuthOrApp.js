import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthOrApp extends Component {
	componentWillMount = async () => {
		// eslint-disable-next-line react/prop-types
		const { navigation } = this.props;
		const json = await AsyncStorage.getItem('userData');
		const userData = JSON.parse(json || '{}');

		if (userData.token) {
			axios.defaults.headers.common.Authorization = `bearer ${
				userData.token
			}`;
			navigation.navigate('Home', userData);
		} else {
			navigation.navigate('Auth');
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<ActivityIndicator />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black'
	}
});
