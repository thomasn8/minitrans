import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { useHomeRedirect } from "./useRedirect";
import { LoginDto } from "../../_dto/login-dto";
import { CreateUserDto } from "../../_dto/create-user.dto";
import { api_request } from "../../assets/utils";

import styles from './css/Login.module.css'

interface LoginPageProps {
	user: LoginDto | undefined;
}

function LoginPage({user}: LoginPageProps) {

	useHomeRedirect(user);
	
	const [signin, setSignin] = React.useState(false);
	function handleClickSignin(event: SyntheticEvent) {
		event.preventDefault();
		setSignin(!signin);
	}

	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [repeatPassword, setRepeatPassword] = React.useState('');

	const [errorMessage, seterrorMessage] = React.useState('');

	function message(text: string) {
		seterrorMessage(text);
		setTimeout(() => {
			seterrorMessage("");
		}, 3000);
	}

	function handleSubmitLogin(event: SyntheticEvent) {
		event.preventDefault();

		// ...
	}

	async function handleSubmitSignin(event: SyntheticEvent) {
		event.preventDefault();

		// Validation password characters 
		// ...

		if (password !== repeatPassword)
		message('Passwords don\'t match')

		let user: CreateUserDto = {
			email: email,
			password: password
		}

		api_request('post', '/api/users', undefined, user)
		.then((res) => {
			message(res.text);
		})
		.catch((err) => {
			message(err.text);
		});
	}

	return (
			<div id="login" className={styles.login_wrapper}>
				{signin === false &&
				<>
				<h1 className={`title ${styles.login}`}>Login</h1>
				<div className={`nav nav_top ${styles.login}`}>
					<Link to="" onClick={handleClickSignin}>Sign in</Link>
					<span>/</span>
					<Link to="/recover">Forgotten password</Link>
				</div>
				<form className={styles.login} onSubmit={handleSubmitLogin}>
					<input
						className={styles.login}
						type="email"
						placeholder="Email"
						onChange={(event) => setEmail(event.target.value)}
						autoFocus
					/>
					<input
						className={styles.login}
						type="password"
						placeholder="Password"
						onChange={(event) => setPassword(event.target.value)}
					/>
					<button className={styles.login} type="submit">Enter</button>
				</form>
				</>

				||

				<>
				<h1 className={`title ${styles.login}`}>Sign in</h1>
				<div className={`nav nav_top ${styles.login}`}>
					<Link to="" onClick={handleClickSignin}>Login</Link>
				</div>
				<form className={styles.login} onSubmit={handleSubmitSignin}>
					<input
						className={styles.login}
						type="email"
						placeholder="Email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						autoFocus
					/>
					<input
						className={styles.login}
						type="password"
						placeholder="Password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					<input
						className={styles.login}
						type="password"
						placeholder="Repeat password"
						value={repeatPassword}
						onChange={(event) => setRepeatPassword(event.target.value)}
					/>
					<button className={styles.login} type="submit">Enter</button>
				</form>
				</>}

				<p className={`error_message ${styles.login}`}>{errorMessage}error</p>
			</div>
	);
}

export default LoginPage;
