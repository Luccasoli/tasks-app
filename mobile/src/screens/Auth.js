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
		if (this.state.stageNew) {
			Alert.alert('Sucesso!', 'Criar conta');
		} else {
			Alert.alert('Sucesso!', 'Logar');
		}
	};

	render() {
		return (
			<ImageBackground source={backgroundImage} style={styles.background}>
				<Text style={styles.title}>Tasks</Text>
				<View style={styles.formContainer}>
					<Text style={styles.subtitle}>
						{this.state.stageNew
							? 'Crie a sua conta'
							: 'Informe seus dados'}
					</Text>
					{this.state.stageNew && (
						<AuthInput
							icon="user"
							style={styles.input}
							placeholder="Nome"
							value={this.state.name}
							onChangeText={name => this.setState({ name })}
						/>
					)}
					<AuthInput
						icon="at"
						style={styles.input}
						placeholder="E-mail"
						value={this.state.email}
						onChangeText={email => this.setState({ email })}
					/>
					<AuthInput
						icon="lock"
						secureTextEntry={true}
						style={styles.input}
						placeholder="Senha"
						value={this.state.password}
						onChangeText={password => this.setState({ password })}
					/>
					{this.state.stageNew && (
						<AuthInput
							icon="asterisk"
							secureTextEntry={true}
							style={styles.input}
							placeholder="Confirmação"
							value={this.state.confirmPassword}
							onChangeText={confirmPassword =>
								this.setState({ confirmPassword })
							}
						/>
					)}
					<TouchableOpacity onPress={this.signinOrSignup}>
						<View style={styles.button}>
							<Text style={styles.buttonText}>
								{this.state.stageNew ? 'Registrar' : 'Entrar'}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					style={{ padding: 10 }}
					onPress={() =>
						this.setState({ stageNew: !this.state.stageNew })
					}
				>
					<Text style={styles.buttonText}>
						{this.state.stageNew
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
