import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	FlatList,
	TouchableOpacity,
	Platform,
	StatusBar
} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import { showError, server } from '../common';
import commonStyles from '../commonStyles';
import Task from '../components/Task';
import AddTask from './AddTask';

import todayImage from '../../assets/imgs/today.jpg';
import tomorrowImage from '../../assets/imgs/tomorrow.jpg';
import weekImage from '../../assets/imgs/week.jpg';
import monthImage from '../../assets/imgs/month.jpg';

export default class Agenda extends Component {
	state = {
		tasks: [],
		visibleTasks: [],
		showDoneTasks: true,
		showAddTask: false
	};

	componentDidMount = async () => {
		this.loadTasks();
	};

	addTask = async task => {
		try {
			await axios.post(`${server}/tasks`, {
				desc: task.desc,
				estimateAt: task.date
			});

			this.setState({ showAddTask: false }, this.loadTasks);
		} catch (err) {
			showError(err);
		}
	};

	deleteTask = async id => {
		try {
			await axios.delete(`${server}/tasks/${id}`);
			this.loadTasks();
		} catch (err) {
			showError(err);
		}
	};

	onToggleTask = async id => {
		try {
			await axios.put(`${server}/tasks/${id}/toggle`);
			await this.loadTasks();
		} catch (err) {
			showError(err);
		}
	};

	loadTasks = async () => {
		// eslint-disable-next-line react/prop-types
		const { daysAhead } = this.props;
		try {
			const maxDate = moment()
				.add({ days: daysAhead })
				.format('YYYY-MM-DD 23:59');
			const res = await axios.get(`${server}/tasks?date=${maxDate}`);

			this.setState(
				{
					tasks: res.data
				},
				this.filterTasks
			);
		} catch (err) {
			showError(err);
		}
	};

	filterTasks = () => {
		this.setState(prevState => {
			let visibleTasks = null;
			if (prevState.showDoneTasks) {
				visibleTasks = [...prevState.tasks];
			} else {
				const isPending = item => item.doneAt === null;

				visibleTasks = prevState.tasks.filter(isPending);
			}

			return { visibleTasks };
		});
	};

	toggleFilter = () => {
		this.setState(
			prevState => ({
				showDoneTasks: !prevState.showDoneTasks
			}),
			this.filterTasks
		);
	};

	render() {
		const { showDoneTasks, showAddTask, visibleTasks } = this.state;
		// eslint-disable-next-line react/prop-types
		const { navigation, title } = this.props;
		const { today, tomorrow, week, month } = commonStyles.colors;
		// eslint-disable-next-line react/prop-types
		const { daysAhead } = this.props;

		// eslint-disable-next-line no-unused-vars
		let styleColor;
		// eslint-disable-next-line no-unused-vars
		let image;

		switch (daysAhead) {
			case 0:
				styleColor = today;
				image = todayImage;
				break;
			case 1:
				styleColor = tomorrow;
				image = tomorrowImage;
				break;
			case 7:
				styleColor = week;
				image = weekImage;
				break;
			default:
				styleColor = month;
				image = monthImage;
		}

		const statusBar =
			Platform.OS === 'android' ? (
				<StatusBar backgroundColor="#400" barStyle="light-content" />
			) : null;

		const tasksList =
			visibleTasks.length > 0 ? (
				<FlatList
					data={visibleTasks}
					keyExtractor={item => item.id.toString()}
					renderItem={({ item }) => (
						<Task
							{...item}
							onToggleTask={this.onToggleTask}
							onDelete={this.deleteTask}
						/>
					)}
				/>
			) : (
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<Text
						style={{
							alignSelf: 'center',
							fontSize: 20,
							fontFamily: commonStyles.fontFamily
						}}
					>
						Não há tarefas para hoje
					</Text>
				</View>
			);

		return (
			<View style={styles.container}>
				{statusBar}
				<AddTask
					isVisible={showAddTask}
					onSave={this.addTask}
					onCancel={() => this.setState({ showAddTask: false })}
				/>
				<ImageBackground source={image} style={styles.background}>
					{/* Header */}
					<View style={styles.iconBar}>
						<TouchableOpacity
							onPress={() => navigation.openDrawer()}
						>
							<Icon
								name="bars"
								size={20}
								color={commonStyles.colors.secondary}
							/>
						</TouchableOpacity>
						<TouchableOpacity onPress={this.toggleFilter}>
							<Icon
								name={showDoneTasks ? 'eye' : 'eye-slash'}
								size={20}
								color={commonStyles.colors.secondary}
							/>
						</TouchableOpacity>
					</View>
					{/* End of Header */}
					<View style={styles.titleBar}>
						<Text style={styles.title}>{title}</Text>
						<Text style={styles.subtitle}>
							{moment()
								.locale('pt-br')
								.format('ddd, D [de] MMMM')}
						</Text>
					</View>
				</ImageBackground>
				<View style={styles.taskContainer}>{tasksList}</View>
				<ActionButton
					buttonColor={styleColor}
					onPress={() => this.setState({ showAddTask: true })}
				/>
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
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});
