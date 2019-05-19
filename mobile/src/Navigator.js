import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Agenda from './screens/Agenda';
import Auth from './screens/Auth';

const MainRoutes = {
	Auth: {
		name: 'Auth',
		screen: Auth
	},
	Home: {
		name: 'Home',
		screen: Agenda
	}
};

const MainNavigator = createSwitchNavigator(MainRoutes, {
	initialRouteName: 'Auth'
});

export default createAppContainer(MainNavigator);
