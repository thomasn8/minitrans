import React, { SyntheticEvent } from "react";
import Nav from "../nav/Nav";
import { LoginDto } from "../../_dto/login-dto";

import styles from './css/ChatEntry.module.css'

interface ChatEntryProps {
	login: LoginDto | undefined;
	setPseudo: Function;
}

function ChatEntry({login, setPseudo}: ChatEntryProps) {

	const [pseudoInput, setPseudoInput] = React.useState('');
	const [errorMessage, seterrorMessage] = React.useState('');

	function handleSubmitPseudo(event: SyntheticEvent) {
		event.preventDefault();
		// validation pseudoInput
		// max 25 char long, char autorized: printable
		// si ok pseudo = pseudoInput
		setPseudo(pseudoInput);
	}

	return (
			<>
			<h1 className="title">Chat</h1>
			<Nav />
			<form className={styles.chat} onSubmit={handleSubmitPseudo}>
				<input
					className={styles.chat}
					type="text"
					placeholder="Pseudo"
					value={pseudoInput}
					onChange={(event) => setPseudoInput(event.target.value)}
					autoFocus
				/>
				<button className={styles.chat} type="submit">Enter</button>
			</form>
			<p className={`error_message ${styles.chat}`}>{errorMessage}error</p>
			</>
	);

}

export default ChatEntry;
