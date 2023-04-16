import React, { SyntheticEvent } from "react";
import { useLoginRedirect } from "../login/useRedirect";
import { LoginDto } from "../../dto/login-dto";
import Nav from "../nav/Nav";
import '../../assets/css/chat.css';

interface ChatPageProps {
	user: LoginDto | undefined;
}

function ChatPage({user}: ChatPageProps) {

	useLoginRedirect(user);

	const [pseudoInput, setPseudoInput] = React.useState('');
	const [pseudo, setPseudo] = React.useState('');
	function handleSubmitPseudo(event: SyntheticEvent) {
		event.preventDefault()
	}

	return (
		<div id="chat">
			{pseudo === '' && 
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
				{/* <div className="login-adds">
					<a onClick={handleClickSignin}>Signin</a>
					<span>/</span>
					<a>Forgotten password</a>
				</div> */}
				<button type="submit">Enter</button>
			</form>
			</>
			
			||
			
			<>
			</>
			}
		</div>
	);
}

export default ChatPage;
