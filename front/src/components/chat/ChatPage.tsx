import React from "react";
import { useLoginRedirect } from "../login/useRedirect";
import { LoginDto } from "../../_dto/login-dto";
import ChatEntry from "./ChatEntry";
import ChatRoom from "./ChatRoom";

import styles from './css/Chat.module.css'

interface ChatPageProps {
	login: LoginDto | undefined;
}

function ChatPage({login}: ChatPageProps) {

	useLoginRedirect(login);

	const [pseudo, setPseudo] = React.useState('');

	return (
		<div id="chat" className={styles.chat_wrapper}>
			{pseudo === '' &&
			<ChatEntry login={login} setPseudo={setPseudo}/> ||
			<ChatRoom login={login} pseudo={pseudo} />}
		</div>
	);

}

export default ChatPage;
