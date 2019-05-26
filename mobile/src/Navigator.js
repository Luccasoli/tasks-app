import React from 'react';
import {
	createAppContainer,
	createSwitchNavigator,
	createDrawerNavigator
} from 'react-navigation';
import Menu from './screens/Menu';
import Agenda from './screens/Agenda';
import Auth from './screens/Auth';
import commonStyles from './commonStyles';

const MenuRoutes = {
	Today: {
		name: 'today',
		screen: props => <Agenda title="Hoje" daysAhead={0} {...props} />,
		navigationOptions: {
			title: 'Hoje'
		}
	},
	Tomorrow: {
		name: 'tomorrow',
		screen: props => <Agenda title="Amanhã" daysAhead={1} {...props} />,
		navigationOptions: {
			title: 'Amanhã'
		}
	},
	Week: {
		name: 'week',
		screen: props => <Agenda title="Semana" daysAhead={7} {...props} />,
		navigationOptions: {
			title: 'Semana'
		}
	},
	Month: {
		name: 'month',
		screen: props => <Agenda title="Mês" daysAhead={30} {...props} />,
		navigationOptions: {
			title: 'Mês'
		}
	}
};

const MenuConfig = {
	initialRouteName: 'Today',
	contentComponent: Menu,
	contentOptions: {
		labelStyle: {
			fontFamily: commonStyles.fontFamily,
			fontWeight: 'normal',
			fontSize: 20
		},
		activeLabelStyle: {
			color: '#080'
		}
	}
};

const MenuNavigator = createDrawerNavigator(MenuRoutes, MenuConfig);

const MainRoutes = {
	Auth: {
		name: 'Auth',
		screen: Auth
	},
	Home: {
		name: 'Home',
		screen: MenuNavigator
	}
};

const MainNavigator = createSwitchNavigator(MainRoutes, {
	initialRouteName: 'Auth'
});

export default createAppContainer(MainNavigator);
