import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { useHomeRedirect } from "./useRedirect";
import { LoginDto } from "../../_dto/login-dto";

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
						autoFocus
					/>
					<input
						className={styles.login}
						type="password"
						placeholder="Password"
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
					<button className={styles.login} type="submit">Enter</button>
				</form>
				</>}

				<p className={`error_message ${styles.login}`}>{errorMessage}error</p>
			</div>
	);
}

export default LoginPage;
