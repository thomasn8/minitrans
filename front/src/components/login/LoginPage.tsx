import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { useHomeRedirect } from "./useRedirect";
import { LoginDto } from "../../dto/login-dto";

import styles from './css/Login.module.css'

interface LoginPageProps {
	user: LoginDto | undefined;
}

function LoginPage({user}: LoginPageProps) {

	useHomeRedirect(user);

	const [signin, setSignin] = React.useState(false);
	function handleClickSignin() {
		setSignin(!signin);
	}

	const [errorMessage, seterrorMessage] = React.useState('');
	function handleSubmitLogin(event: SyntheticEvent) {
		event.preventDefault();

		// ...
	}
	function handleSubmitSignin(event: SyntheticEvent) {
		event.preventDefault();

		// ...
	}

	return (
			<div id="login" className={styles.login_wrapper}>
				{signin === false &&
				<>
				<h1 className={`title ${styles.login}`}>Login</h1>
				<form onSubmit={handleSubmitLogin} className={styles.login}>
					<input
						className={styles.login}
						type="email"
						placeholder="Email"
						autoFocus
					/>
					<input
						className={styles.login}
						type="password"
						placeholder="Password"
					/>
					<div className={`nav ${styles.login}`}>
						<a onClick={handleClickSignin}>Signin</a>
						<span>/</span>
						<Link to="/recover">Forgotten password</Link>
					</div>
					<button className={styles.login} type="submit">Enter</button>
				</form>
				</>

				||

				<>
				<h1 className={`title ${styles.login}`}>Signin</h1>
				<form onSubmit={handleSubmitSignin}>
					<input
						className={styles.login}
						type="email"
						placeholder="Email"
						autoFocus
					/>
					<input
						className={styles.login}
						type="password"
						placeholder="Password"
					/>
					<input
						className={styles.login}
						type="password"
						placeholder="Repeat password"
					/>
					<div className={`nav ${styles.login}`}>
						<a onClick={handleClickSignin}>Login</a>
					</div>
					<button className={styles.login} type="submit">Enter</button>
				</form>
				</>}

				<p className={`error_message ${styles.login}`}>{errorMessage}error</p>
			</div>
	);
}

export default LoginPage;
