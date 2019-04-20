/* eslint-disable no-use-before-define */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	FlatList,
	TouchableOpacity,
	Platform
} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import todayImage from '../../assets/imgs/today.jpg';
import commonStyles from '../commonStyles';
import Task from '../components/Task';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Agenda extends Component {
	state = {
		tasks: [
			{
				id: Math.random(),
				desc: 'Comprar curso de React native',
				estimateAt: new Date(),
				doneAt: new Date()
			},
			{
				id: Math.random(),
				desc: 'Concluir curso de React native',
				estimateAt: new Date(),
				doneAt: null
			},
			{
				id: Math.random(),
				desc: 'Comprar curso de React native',
				estimateAt: new Date(),
				doneAt: new Date()
			},
			{
				id: Math.random(),
				desc: 'Concluir curso de React native',
				estimateAt: new Date(),
				doneAt: null
			},
			{
				id: Math.random(),
				desc: 'Comprar curso de React native',
				estimateAt: new Date(),
				doneAt: new Date()
			},
			{
				id: Math.random(),
				desc: 'Concluir curso de React native',
				estimateAt: new Date(),
				doneAt: null
			},
			{
				id: Math.random(),
				desc: 'Comprar curso de React native',
				estimateAt: new Date(),
				doneAt: new Date()
			},
			{
				id: Math.random(),
				desc: 'Concluir curso de React native',
				estimateAt: new Date(),
				doneAt: null
			}
		],
		visibleTasks: [],
		showDoneTasks: false
	};

	componentDidMount = () => {
		this.filterTasks();
	};

	toggleTask = id => {
		let tasks = this.state.tasks.map(item => {
			if (item.id === id) {
				item.doneAt = item.doneAt !== null ? null : new Date();
			}
			return item;
		});
		this.setState({ tasks }, this.filterTasks);
	};

	filterTasks = () => {
		let visibleTasks = null;
		if (this.state.showDoneTasks) {
			visibleTasks = [...this.state.tasks];
		} else {
			const isPending = item => item.doneAt === null;

			visibleTasks = this.state.tasks.filter(isPending);
		}
		this.setState({ visibleTasks });
	};

	toggleFilter = () => {
		this.setState(
			{
				showDoneTasks: !this.state.showDoneTasks
			},
			this.filterTasks
		);
	};

	render() {
		return (
			<View style={styles.container}>
				<ImageBackground source={todayImage} style={styles.background}>
					<View style={styles.iconBar}>
						<TouchableOpacity onPress={this.toggleFilter}>
							<Icon
								name={
									this.state.showDoneTasks
										? 'eye'
										: 'eye-slash'
								}
								size={20}
								color={commonStyles.colors.secondary}
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.titleBar}>
						<Text style={styles.title}>Hoje</Text>
						<Text style={styles.subtitle}>
							{moment()
								.locale('pt-br')
								.format('ddd, D [de] MMMM')}
						</Text>
					</View>
				</ImageBackground>
				<View style={styles.taskContainer}>
					<FlatList
						data={this.state.visibleTasks}
						keyExtractor={item => item.id.toString()}
						renderItem={({ item }) => (
							<Task {...item} toggleTask={this.toggleTask} />
						)}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	background: {
		flex: 3
	},
	titleBar: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	title: {
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.secondary,
		fontSize: 50,
		marginLeft: 20,
		marginBottom: 5
	},
	subtitle: {
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.secondary,
		fontSize: 20,
		marginLeft: 20,
		marginBottom: 20
	},
	taskContainer: {
		flex: 7
	},
	iconBar: {
		marginTop: Platform.OS === 'ios' ? 30 : 10,
		marginHorizontal: 20,
		alignItems: 'flex-end'
	}
});
