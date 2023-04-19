import React, { SyntheticEvent } from "react";
import Nav from "../nav/Nav";
import { LoginDto } from "../../dto/login-dto";

import '../../assets/css/chat.css';

interface ChatEntryProps {
	user: LoginDto | undefined;
	setPseudo: Function;
}

function ChatEntry({user, setPseudo}: ChatEntryProps) {

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
			<form onSubmit={handleSubmitPseudo}>
				<input
					type="text"
					placeholder="Pseudo"
					value={pseudoInput}
					onChange={(event) => setPseudoInput(event.target.value)}
					autoFocus
				/>
				<button type="submit">Enter</button>
			</form>
			<p className="error-message">{errorMessage}error</p>
			</>
	);

}

export default ChatEntry;
