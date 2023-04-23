import React, { SyntheticEvent } from "react";
import { CreateUserDto, QuestionsDto } from "../../_dto/create-user.dto";
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
	const [response2, setResponse2] = React.useState(0);
	const [response3, setResponse3] = React.useState(0);
	const [response4, setResponse4] = React.useState(0);
	const [response5, setResponse5] = React.useState(0);

	// EN CAS DE SIGNIN VALID: 
	// MESSAGE "votre ADN a été détérminé, rendez-vous sur votre boite mail pour confirmer votre inscription et découvrir votre tribu" 
	// + LIEN "retour vers le login"
	async function handleSubmit(event: SyntheticEvent) {
		event.preventDefault();

		if (response1 === 0 ||
			response2 === 0 ||
			response3 === 0 ||
			response4 === 0 ||
			response5 === 0
		) {
			message('You must answer each question')
			return;
		}

		const questions: QuestionsDto = {
			question1: response1,
			question2: response2,
			question3: response3,
			question4: response4,
			question5: response5,
		}

		console.log(questions);

		const bcrypt = require('bcryptjs');
		const saltRounds: number = 10;
    const hash: string = await bcrypt.hash(password, saltRounds);

		let user: CreateUserDto = {
			email: email,
			password: hash,
			questions: questions
		}

		api_request('post', '/api/users', undefined, user)
		.then((res) => {
			if (res.status === 201) {
				setButtonDisabled(true);
				const msg = "Your DNA has been determined, go to your mailbox to confirm your registration and discover your faction.";
				message(msg, 6000);
			}
		})
		.catch((err) => {
			message(err.response.data.message, 4000);
		});
	}

	return (
		<>
		<label className={styles.questions}>
			If you had to face difficult weather conditions during a long trip, what type of weather would you choose ?
		</label>
		<select
			className={styles.questions}
			defaultValue={0}
			onChange={(event) => setResponse1(parseInt(event.target.value))}
		>
			<option value={0} disabled>
				...
			</option>
			<option value={1}>
				Howling wind 
			</option>
			<option value={2}>
				Blistering hot
			</option>
			<option value={3}>
				Freezing cold
			</option>
			<option value={4}>
				Torrential rain
			</option>
		</select>
		<label className={styles.questions}>
			With your tribe, you are confronted with a series of collective events. What role do you take on ?
		</label>
		<select
			className={styles.questions}
			defaultValue={0}
			onChange={(event) => setResponse2(parseInt(event.target.value))}
		>
			<option value={0} disabled>
				...
			</option>
			<option value={1}>
				Mediator
			</option>
			<option value={2}>
				Strategist
			</option>
			<option value={3}>
				Protector
			</option>
			<option value={4}>
				Healer
			</option>
		</select>
		<label className={styles.questions}>
			What type of clothing do you feel most comfortable wearing ?
		</label>
		<select
			className={styles.questions}
			defaultValue={0}
			onChange={(event) => setResponse3(parseInt(event.target.value))}
		>
			<option value={0} disabled>
				...
			</option>
			<option value={1}>
				Lightweight, flowy fabrics
			</option>
			<option value={2}>
				Loose, breathable garments
			</option>
			<option value={3}>
				Soft and warm materials
			</option>
			<option value={4}>
				Shimmery and sparkling outfits 
			</option>
		</select>
		<label className={styles.questions}>
			What kind of sound resonates with you the most ?
		</label>
		<select
			className={styles.questions}
			defaultValue={0}
			onChange={(event) => setResponse4(parseInt(event.target.value))}
		>
			<option value={0} disabled>
				...
			</option>
			<option value={1}>
				Soothing, melodic sounds of waves 
			</option>
			<option value={2}>
				The rhythm of a tribal drum
			</option>
			<option value={3}>
				The symphony of birds singing
			</option>
			<option value={4}>
				The ethereal sounds of a choir
			</option>
		</select>
		<label className={styles.questions}>
			What companion do you choose for an adventure among the following creatures ?
		</label>
		<select
			className={styles.questions}
			defaultValue={0}
			onChange={(event) => setResponse5(parseInt(event.target.value))}
		>
			<option value={0} disabled>
				...
			</option>
			<option value={1}>
				Flaming fennec 
			</option>
			<option value={2}>
				Intrepid raven
			</option>
			<option value={3}>
				Clever jellyfish 
			</option>
			<option value={4}>
				Generous turtle
			</option>
		</select>

		<button 
			className={styles.login}
			type="submit"
			onClick={handleSubmit}
			disabled={buttonDisabled}
		>
			Join
		</button>
		</>
	);
}

export default SigninPart2;
