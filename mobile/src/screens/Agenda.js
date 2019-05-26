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
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import 'moment/locale/pt-br';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import todayImage from '../../assets/imgs/today.jpg';
import commonStyles from '../commonStyles';
import Task from '../components/Task';
import AddTask from './AddTask';

export default class Agenda extends Component {
	state = {
		tasks: [],
		visibleTasks: [],
		showDoneTasks: true,
		showAddTask: false
	};

	componentDidMount = async () => {
		const data = await AsyncStorage.getItem('tasks');
		const tasks = JSON.parse(data) || [];
		this.setState({ tasks }, this.filterTasks);
	};

	addTask = task => {
		this.setState(
			prevState => ({
				tasks: [
					...prevState.tasks,
					{
						id: Math.random(),
						desc: task.desc,
						estimateAt: task.date,
						doneAt: null
					}
				],
				showAddTask: false
			}),
			this.filterTasks
		);
	};

	deleteTask = id => {
		this.setState(prevState => {
			const tasks = prevState.tasks.filter(task => task.id !== id);
			return { tasks };
		}, this.filterTasks);
	};

	onToggleTask = id => {
		this.setState(prevState => {
			const tasks = prevState.tasks.map(item => {
				const task = item;
				if (task.id === id) {
					task.doneAt = task.doneAt !== null ? null : new Date();
				}
				return task;
			});

			return { tasks };
		}, this.filterTasks);
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

			AsyncStorage.setItem('tasks', JSON.stringify(prevState.tasks));

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
		const statusBar =
			Platform.OS === 'android' ? (
				<StatusBar backgroundColor="#400" barStyle="light-content" />
			) : null;

		const { visibleTasks } = this.state;

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

		const { showDoneTasks, showAddTask } = this.state;

		return (
			<View style={styles.container}>
				{statusBar}
				<AddTask
					isVisible={showAddTask}
					onSave={this.addTask}
					onCancel={() => this.setState({ showAddTask: false })}
				/>
				<ImageBackground source={todayImage} style={styles.background}>
					<View style={styles.iconBar}>
						<TouchableOpacity onPress={this.toggleFilter}>
							<Icon
								name={showDoneTasks ? 'eye' : 'eye-slash'}
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
				<View style={styles.taskContainer}>{tasksList}</View>
				<ActionButton
					buttonColor={commonStyles.colors.today}
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
		alignItems: 'flex-end'
	}
});
