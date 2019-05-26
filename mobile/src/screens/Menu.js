import React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { Gravatar } from 'react-native-gravatar';
import { DrawerItems } from 'react-navigation';
import commonStyles from '../commonStyles';

export default props => {
	// eslint-disable-next-line react/prop-types
	const { navigation } = props;
	return (
		<ScrollView>
			<View style={styles.header}>
				<Text style={styles.title}>Tasks</Text>
				<Gravatar
					style={styles.avatar}
					options={{
						email: navigation.getParam('email'),
						secure: true
					}}
				/>
				<View style={styles.userInfo}>
					<View>
						<Text style={styles.name}>
							{navigation.getParam('name')}
						</Text>
						<Text style={styles.email}>
							{navigation.getParam('email')}
						</Text>
					</View>
				</View>
			</View>
			<DrawerItems {...props} />
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	header: {
		borderBottomWidth: 1,
		borderColor: '#DDD'
	},
	title: {
		backgroundColor: 'white',
		color: 'black',
		fontFamily: commonStyles.fontFamily,
		fontSize: 30,
		paddingTop: 30,
		padding: 10
	},
	avatar: {
		width: 60,
		height: 60,
		borderWidth: 3,
		borderColor: '#AAA',
		borderRadius: 30,
		margin: 10
	},
	name: {
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.mainText,
		fontSize: 20,
		marginLeft: 10
	},
	email: {
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.subText,
		fontSize: 15,
		marginLeft: 10,
		marginBottom: 10
	},
	menu: {
		justifyContent: 'center',
		alignItems: 'stretch'
	},
	userInfo: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});
