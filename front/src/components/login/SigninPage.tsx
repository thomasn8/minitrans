import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import SigninPart2 from "./SigninPart2";

import styles from './css/Login.module.css'

interface SigninPagePageProps {
	signin: boolean;
	setSignin: Function;
	message: Function;
	setErrorMessage: Function;
}

function SigninPage({signin, setSignin, message, setErrorMessage}: SigninPagePageProps) {
	
	function handleClickSignin(event: SyntheticEvent) {
		event.preventDefault();
		setSignin(!signin);
	}

	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [repeatPassword, setRepeatPassword] = React.useState('');

	const [questions, setQuestions] = React.useState(false);

	// AJOUTER VALIDATION PASSWORD (ici)
	async function handleClickPart2(event: SyntheticEvent) {
		event.preventDefault();

		if (email.length === 0 || password.length === 0 || repeatPassword.length === 0) {
			message('Empty fields', 4000);
			return;
		}

		// Validation password characters 
		// ...

		if (password !== repeatPassword) {
			message('Passwords don\'t match', 4000);
			return;
		}

		setErrorMessage('');
		setQuestions(true);
	}

	return (
		<>
		<h1 className={`title ${styles.login}`}>Sign in</h1>
		<div className={`nav nav_top ${styles.login}`}>
			<Link to="" onClick={handleClickSignin}>Login</Link>
		</div>
		<form className={styles.login}>
			
			{questions === false &&
			<>
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
			<button 
				className={styles.login}
				onClick={handleClickPart2}
			>
				Enter
			</button>
			</> 
			
			|| <SigninPart2 email={email} password={password} message={message} />}

		</form>
		</>
	);
}

export default SigninPage;
