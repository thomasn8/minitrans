import React from "react";
import { useLoginRedirect } from "../login/useRedirect";
import { LoginDto } from "../../_dto/login-dto";
import ChatEntry from "./ChatEntry";
import ChatRoom from "./ChatRoom";

import styles from './css/Chat.module.css'

interface ChatPageProps {
	login: LoginDto | undefined;
	setToken: Function;
}

function ChatPage({login, setToken}: ChatPageProps) {

	useLoginRedirect(login, setToken);

	const [pseudo, setPseudo] = React.useState('');

	return (
		<div id="chat" className={styles.chat_wrapper}>
			{/* {pseudo === '' &&
			<ChatEntry login={login} setPseudo={setPseudo}/> ||
			<ChatRoom login={login} pseudo={pseudo} />} */}
			<ChatRoom login={login} />
		</div>
	);

}

export default ChatPage;
