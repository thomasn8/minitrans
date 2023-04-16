import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { useHomeRedirect } from "./useRedirect";
import { LoginDto } from "../../dto/login-dto";

import '../../assets/css/login.css'

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
			<div id="login">
				{signin === false &&
				<>
				<h1 className="title">Login</h1>
				<form onSubmit={handleSubmitLogin}>
					<input
						type="email"
						placeholder="Email"
						autoFocus
					/>
					<input
						type="password"
						placeholder="Password"
					/>
					<div className="login-adds">
						<a onClick={handleClickSignin}>Signin</a>
						<span>/</span>
						<Link to="/recover_password">Forgotten password</Link>
					</div>
					<button type="submit">Enter</button>
				</form>
				</>

				||

				<>
				<h1 className="title">Signin</h1>
				<form onSubmit={handleSubmitSignin}>
					<input
						type="email"
						placeholder="Email"
						autoFocus
					/>
					<input
						type="password"
						placeholder="Password"
					/>
					<input
						type="password"
						placeholder="Repeat password"
					/>
					<div className="login-adds">
						<a onClick={handleClickSignin}>Login</a>
					</div>
					<button type="submit">Enter</button>
				</form>
				</>}

				<p className="error-message">{errorMessage}error</p>
			</div>
	);
}

export default LoginPage;
