import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
	Alert
} from 'react-native';
import axios from 'axios';
import commonmStyles from '../commonStyles';
import backgroundImage from '../../assets/imgs/login.jpg';
import AuthInput from '../components/AuthInput';
import { server, showError } from '../common';

export default class Auth extends Component {
	state = {
		stageNew: false,
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	};

	signin = async () => {
		const { email, password } = this.state;

		// eslint-disable-next-line react/prop-types
		const { navigation } = this.props;

		try {
			const res = await axios.post(`${server}/signin`, {
				email,
				password
			});

			axios.defaults.headers.common.Authorization = `bearer ${
				res.data.token
			}`;

			navigation.navigate('Home', res.data);
		} catch (err) {
			Alert.alert('Erro!', 'Falha no Login!');
		}
	};

	signup = async () => {
		const { name, email, password, confirmPassword } = this.state;

		try {
			await axios.post(`${server}/signup`, {
				name,
				email,
				password,
				confirmPassword
			});

			Alert.alert('Sucesso!', 'Usuário cadastrado :)');
			this.setState({ stageNew: false }); // Exibe os inputs para signin
		} catch (err) {
			// alert(JSON.stringify(err, null, 3))
			showError(err.response.data);
		}
	};

	signinOrSignup = () => {
		const { stageNew } = this.state;
		if (stageNew) {
			this.signup();
		} else {
			this.signin();
		}
	};

	render() {
		const { stageNew, name, email, password, confirmPassword } = this.state;

		const validations = [];

		validations.push(email.trim() && email.includes('@'));
		validations.push(password && password.length >= 6);

		if (stageNew) {
			validations.push(name.trim());
			validations.push(password && password === confirmPassword);
		}

		const validForm = validations.reduce((all, v) => all && v);

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
					<TouchableOpacity
						disabled={!validForm}
						onPress={this.signinOrSignup}
					>
						<View
							style={[
								styles.button,
								!validForm ? { backgroundColor: '#333' } : {}
							]}
						>
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
