import React from "react";
import { useLoginRedirect } from "../login/useRedirect";
import { LoginDto } from "../../dto/login-dto";
import ChatEntry from "./ChatEntry";
import ChatRoom from "./ChatRoom";

import styles from './css/Chat.module.css'

interface ChatPageProps {
	user: LoginDto | undefined;
}

function ChatPage({user}: ChatPageProps) {

	useLoginRedirect(user);

	const [pseudo, setPseudo] = React.useState('');

	return (
		<div id="chat" className={styles.chat_wrapper}>
			{pseudo === '' &&
			<ChatEntry user={user} setPseudo={setPseudo}/> ||
			<ChatRoom user={user} pseudo={pseudo} />}
		</div>
	);

}

export default ChatPage;
