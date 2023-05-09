import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { useHomeRedirect } from "./useRedirect";
import SigninPage from "./SigninPage";
import { LoginDto } from "../../_dto/login-dto";
import { api_request } from "../../assets/utils";

import styles from './css/Login.module.css'

interface LoginPageProps {
	login: LoginDto | undefined;
}

function LoginPage({login}: LoginPageProps) {

	useHomeRedirect(login);
	
	const [signin, setSignin] = React.useState(false);
	function handleClickSignin(event: SyntheticEvent) {
		event.preventDefault();
		setSignin(!signin);
	}

	const [email, setEmail] = React.useState('thomasnanchen@hotmail.com');
	const [password, setPassword] = React.useState('password');

	const [errorMessage, setErrorMessage] = React.useState('');

	function message(text: string, timeInMs: number) {
		setErrorMessage(text);
		setTimeout(() => {
			setErrorMessage("");
		}, timeInMs);
	}

	function handleSubmitLogin(event: SyntheticEvent) {
		event.preventDefault();

		// VALIDATION
		// ...
		
		api_request('post', '/api/auth/login', undefined, {
			email: email,
			password: password
		})
		.then((res) => {
			if (res.status === 200) {
				localStorage.setItem("token", res.data);
				login?.setToken(res.data);
			}
		})
		.catch((err) => {
			message(err.response.data.message, 4000);
		});
	}

	return (
			<div id="login" className={styles.login_wrapper}>
				{signin === false &&
				<>
				<h1 className={`title ${styles.login}`}>Login</h1>
				<div className={`nav nav_top ${styles.login}`}>
					<a onClick={handleClickSignin}>Sign in</a>
					<span>/</span>
					<Link to="/recover">Forgotten password</Link>
				</div>
				<form className={styles.login} onSubmit={handleSubmitLogin}>
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
					<button className={styles.login} type="submit">Enter</button>
				</form>
				</>

				|| <SigninPage signin={signin} setSignin={setSignin} message={message} setErrorMessage={setErrorMessage} />}

				<p className={`error_message ${styles.login}`}>{errorMessage}</p>
			</div>
	);
}

export default LoginPage;
