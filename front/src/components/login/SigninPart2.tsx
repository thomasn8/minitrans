import React, { SyntheticEvent } from "react";
import { LoginDto } from "../../_dto/login-dto";
import { CreateUserDto } from "../../_dto/create-user.dto";
import { api_request } from "../../assets/utils";

import styles from './css/Login.module.css'

interface SigninPagePageProps {
	email: string,
	password: string,
	message: Function;
}

function SigninPart2({email, password, message}: SigninPagePageProps) {
	
	const [buttonDisabled, setButtonDisabled] = React.useState(false);

	const [response1, setResponse1] = React.useState(0);

	// AJOUTER SELECT BOX QUIZZ EN 2EME ETAPE
	// AJOUTER REDIRECTION SUR LOGIN EN CAS DE SUCCESS 
		// OU MESSAGE (DIRE DE CONFIRME PAR EMAIL+ LIEN VERS LOGIN)
	// AJOUTER EMAIL VERIFICATION (cote server)
	async function handleSubmit(event: SyntheticEvent) {
		event.preventDefault();

		// Get questions response to calculate Element

		const bcrypt = require('bcryptjs');
		const saltRounds: number = 10;
    const hash: string = await bcrypt.hash(password, saltRounds);

		let user: CreateUserDto = {
			email: email,
			password: hash
		}

		api_request('post', '/api/users', undefined, user)
		.then((res) => {
			if (res.status === 201) {
				setButtonDisabled(true);
				message(res.data, 6000);
			}
		})
		.catch((err) => {
			message(err.response.data.message, 4000);
		});
	}

	return (
		<>

		<label>Question 1: ...</label>
		<select
			defaultValue={0}
			onChange={(event) => setResponse1(0)}
			// onChange={(event) => setResponse1(event.target.value)}
		>
			<option id="defaultOption" key={1} value="0">
				response 1
			</option>
			<option id="defaultOption" key={2} value="0">
				response 2
			</option>
			<option id="defaultOption" key={3} value="0">
				response 3
			</option>
			<option id="defaultOption" key={4} value="0">
				response 4
			</option>
		</select>
		<label>Question 2: ...</label>
		<select
			defaultValue={0}
			onChange={(event) => setResponse1(0)}
			// onChange={(event) => setResponse1(event.target.value)}
		>
			<option id="defaultOption" key={1} value="0">
				response 1
			</option>
			<option id="defaultOption" key={2} value="0">
				response 2
			</option>
			<option id="defaultOption" key={3} value="0">
				response 3
			</option>
			<option id="defaultOption" key={4} value="0">
				response 4
			</option>
		</select>
		<label>Question 3: ...</label>
		<select
			defaultValue={0}
			onChange={(event) => setResponse1(0)}
			// onChange={(event) => setResponse1(event.target.value)}
		>
			<option id="defaultOption" key={1} value="0">
				response 1
			</option>
			<option id="defaultOption" key={2} value="0">
				response 2
			</option>
			<option id="defaultOption" key={3} value="0">
				response 3
			</option>
			<option id="defaultOption" key={4} value="0">
				response 4
			</option>
		</select>
		<label>Question 4: ...</label>
		<select
			defaultValue={0}
			onChange={(event) => setResponse1(0)}
			// onChange={(event) => setResponse1(event.target.value)}
		>
			<option id="defaultOption" key={1} value="0">
				response 1
			</option>
			<option id="defaultOption" key={2} value="0">
				response 2
			</option>
			<option id="defaultOption" key={3} value="0">
				response 3
			</option>
			<option id="defaultOption" key={4} value="0">
				response 4
			</option>
		</select>
		<label>Question 5: ...</label>
		<select
			defaultValue={0}
			onChange={(event) => setResponse1(0)}
			// onChange={(event) => setResponse1(event.target.value)}
		>
			<option id="defaultOption" key={1} value="0">
				response 1
			</option>
			<option id="defaultOption" key={2} value="0">
				response 2
			</option>
			<option id="defaultOption" key={3} value="0">
				response 3
			</option>
			<option id="defaultOption" key={4} value="0">
				response 4
			</option>
		</select>

		<button 
			className={styles.login}
			type="submit"
			onClick={handleSubmit}
			disabled={buttonDisabled}
		>
			Submit
		</button>
		</>
	);
}

export default SigninPart2;
