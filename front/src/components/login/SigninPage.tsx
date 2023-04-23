import React, { SyntheticEvent } from "react";
import SigninPart2 from "./SigninPart2";
import { api_request } from "../../assets/utils";

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


	async function handleClickPart2(event: SyntheticEvent) {
		event.preventDefault();

		if (email.length === 0 || password.length === 0 || repeatPassword.length === 0) {
			message('Empty fields', 4000);
			return;
		}

		// check unique email
		const res = await api_request('post', '/api/users/email', undefined, {email: email});
		if (res.data !== false) {
			message("Email already used", 4000);
			return;
		}

		// check password format and repetition
		if (password.length < 6) {
			message('Passwords too short, minimum 6 characters', 4000);
			return;			
		}

		const regex = /^([a-zA-Z0-9 \._-]+)$/;
		const isValid: boolean = regex.test(password);
		if (isValid === false) {
			message('Passwords format invalid. Allowed: [a-zA-Z0-9 ._-]', 4000);
			return;			
		}

		if (password !== repeatPassword) {
			message('Passwords don\'t match', 4000);
			return;
		}

		setErrorMessage('');
		setQuestions(true);
	}

	return (
		<>
		<h1 className={`title ${styles.login}`}>{questions === false && "Sign in" || "Your ADN"}</h1>
		{questions === false &&
		<div className={`nav nav_top ${styles.login}`}>
			<a onClick={handleClickSignin}>Login</a>
		</div>
		}
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
			
			|| <SigninPart2 email={email} password={password} message={message} signin={signin} setSignin={setSignin}/>}

		</form>
		</>
	);
}

export default SigninPage;
