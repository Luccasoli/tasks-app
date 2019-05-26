import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
	Alert
} from 'react-native';
import commonmStyles from '../commonStyles';
import backgroundImage from '../../assets/imgs/login.jpg';
import AuthInput from '../components/AuthInput';

export default class Auth extends Component {
	state = {
		stageNew: false,
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	};

	signinOrSignup = () => {
		const { stageNew } = this.state;
		if (stageNew) {
			Alert.alert('Sucesso!', 'Criar conta');
		} else {
			Alert.alert('Sucesso!', 'Logar');
		}
	};

	render() {
		const { stageNew, name, email, password, confirmPassword } = this.state;
		return (
			<ImageBackground source={backgroundImage} style={styles.background}>
				<Text style={styles.title}>Tasks</Text>
				<View style={styles.formContainer}>
					<Text style={styles.subtitle}>
						{stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
					</Text>
					{stageNew && (
						<AuthInput
							icon="user"
							style={styles.input}
							placeholder="Nome"
							value={name}
							// eslint-disable-next-line no-shadow
							onChangeText={name => this.setState({ name })}
						/>
					)}
					<AuthInput
						icon="at"
						style={styles.input}
						placeholder="E-mail"
						value={email}
						// eslint-disable-next-line no-shadow
						onChangeText={email => this.setState({ email })}
					/>
					<AuthInput
						icon="lock"
						secureTextEntry
						style={styles.input}
						placeholder="Senha"
						value={password}
						// eslint-disable-next-line no-shadow
						onChangeText={password => this.setState({ password })}
					/>
					{stageNew && (
						<AuthInput
							icon="asterisk"
							secureTextEntry
							style={styles.input}
							placeholder="Confirmação"
							value={confirmPassword}
							// eslint-disable-next-line no-shadow
							onChangeText={confirmPassword =>
								this.setState({ confirmPassword })
							}
						/>
					)}
					<TouchableOpacity onPress={this.signinOrSignup}>
						<View style={styles.button}>
							<Text style={styles.buttonText}>
								{stageNew ? 'Registrar' : 'Entrar'}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					style={{ padding: 10 }}
					onPress={() => this.setState({ stageNew: !stageNew })}
				>
					<Text style={styles.buttonText}>
						{stageNew
							? 'Já possui conta?'
							: 'Ainda não possui conta?'}
					</Text>
				</TouchableOpacity>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		fontFamily: commonmStyles.fontFamily,
		color: 'white',
		fontSize: 70,
		marginBottom: 10
	},
	subtitle: {
		fontFamily: commonmStyles.fontFamily,
		color: 'white',
		fontSize: 20
	},
	formContainer: {
		backgroundColor: 'rgba(0,0,0,0.8)',
		padding: 20,
		width: '90%'
	},
	input: {
		marginTop: 10,
		backgroundColor: 'white'
	},
	button: {
		backgroundColor: '#080',
		marginTop: 10,
		padding: 10,
		alignItems: 'center'
	},
	buttonText: {
		fontFamily: commonmStyles.fontFamily,
		color: 'white',
		fontSize: 20
	}
});
