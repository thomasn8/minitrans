import React from "react";
import { useLoginRedirect } from "../login/useRedirect";
import { LoginDto } from "../../_dto/login-dto";
import ChatRoom from "./ChatRoom";

import styles from './css/Chat.module.css'

interface ChatPageProps {
	login: LoginDto | undefined;
	setToken: Function;
}

function ChatPage({login, setToken}: ChatPageProps) {

	useLoginRedirect(login, setToken);

	return (
		<div id="chat" className={styles.chat_wrapper}>
			{login && <ChatRoom login={login} />}
		</div>
	);

}

export default ChatPage;
