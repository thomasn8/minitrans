import React, { SyntheticEvent } from "react";

import '../../assets/css/login.css'

function LoginPage() {
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
			<div className="login">
				{signin === false &&
				(<>
				<p className="title">Login</p>
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
						<a>Forgotten password</a>
					</div>
					<button type="submit">Enter</button>
				</form>
				</>)

				||
				(<>
				<p className="title">Signin</p>
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
				</>)}

				<p className="error-message">{errorMessage}error</p>
			</div>
	);
}

export default LoginPage;
