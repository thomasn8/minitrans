import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";

import { io, Socket } from 'socket.io-client';

import { LoginDto } from "../../_dto/login-dto";
import { ChatUserDto } from "../../_dto/chat-user.dto";
import { ChatMessageDto } from "../../_dto/chat-message.dto";

import styles from './css/ChatRoom.module.css'

interface ChatRoomProps {
	user: LoginDto | undefined;
	pseudo: string;
}

function ChatRoom({user, pseudo}: ChatRoomProps) {

	const [usersCount, setUsersCount] = React.useState('');
	const [users, setUsers] = React.useState<ChatUserDto[]>([]);
	const [typing, setTyping] = React.useState(false);
	const [usersTyping, setUsersTyping] = React.useState<string[]>([]);
	const [messages, setMessages] = React.useState<ChatMessageDto[]>([]);
	const [messageInput, setMessageInput] = React.useState('');

	const socketRef = React.useRef<Socket>();

	React.useEffect(() => {
		
		if (socketRef.current === undefined) {

			socketRef.current = io("", {
        path: "/socket-chat/",
        timeout: 10000,
        extraHeaders: {
          // Authorization: `Bearer ${token}`,
					Pseudo: pseudo,
        },
      });

			// socketRef.current.on("connect", () => {
      //   console.log("connection to chat: success");
			// })

			socketRef.current && socketRef.current.emit('findAllUsers', {}, (res: ChatUserDto[]) => {
				setUsers(res);
			})
		
			socketRef.current && socketRef.current.emit('findAllMessages', {}, (res: ChatMessageDto[]) => {
				setMessages(res);
			})

			socketRef.current && socketRef.current.on('countUsers', (res: number) => {
				let wordUser: string;
				res > 1 ? wordUser = 'users' : wordUser = 'user'
				setUsersCount(res + ' ' + wordUser);
			})

		}

	}, [user, pseudo]);

	socketRef.current && socketRef.current.on('newClient', (res: ChatUserDto) => {
		setUsers([...users, res]);
	})

	socketRef.current && socketRef.current.on('disconect', (res: number) => {
		setUsers(users.filter(user => user.id !== res));
	})

	socketRef.current && socketRef.current.on('broadcastMessage', (res: ChatMessageDto) => {
		setMessages([...messages, res]);
	})
	
	socketRef.current && socketRef.current.on('isTyping', (res: string) => {
		setUsersTyping([...usersTyping, res]);
	})

	socketRef.current && socketRef.current.on('stopTyping', (res: string) => {
		setUsersTyping(usersTyping.filter(userTyping => userTyping !== res));
	})

	function sendMessage(event: SyntheticEvent) {
		event.preventDefault()
		let message: ChatMessageDto = { pseudo: pseudo, text: messageInput };
		if (messageInput !== '' && messageInput.length < 2000) {
			socketRef.current && socketRef.current.emit('message', message);
		}
		setMessageInput('');
	};

	function emitTyping() {
		if (typing === false) {
			setTyping(true);
			socketRef.current && socketRef.current.emit('isTyping', {pseudo: pseudo} );
			
			setTimeout (() => {
				socketRef.current && socketRef.current.emit('stopTyping', {pseudo: pseudo} );
				setTyping(false);
			}, 10000);
		}
	}


	return (
		<div className={styles.chat_container}>		

			<div className={styles.users_container}>
				<div className={styles.count}>
					{usersCount}
				</div>
				<div className={`${styles.users_wrapper} ${styles.scrollbar}`}>
					<div className={styles.users}>
						{users.map((user) => {
							return (
								<div key={user.id} className={styles.user_wrapper}>
									
									{usersTyping.map((userTyping) => {
										return (
											(userTyping === user.pseudo) && 
												(userTyping === pseudo && 
												<span key={pseudo} className={styles.me_typing}></span> ||
												<span key={pseudo} className={styles.typing}></span>)
										);
									})}

									{user.pseudo === pseudo &&
									<span className={`${styles.user} ${styles.me}`}>{user.pseudo} (me)</span> ||
									<span className={`${styles.user} ${styles.else}`}>{user.pseudo}</span>}
									<span className={styles.lister}>•</span>

								</div>
							);
						})}
					</div>
				</div>
			</div>

			<div className={styles.messages_container}>
				<div className={styles.title_chat}>
					<span>Chat</span>
					<span className={styles.chatnav}>
						<Link to="/"><span className={styles.chatlink}>Home</span></Link>
						<span className={styles.chatlink}>/</span>
						<Link to="/logout"><span className={styles.chatlink}>Logout</span></Link>
					</span>
				</div>
				<div className={styles.messages_wrapper}>
					<div className={`${styles.messages} ${styles.scrollbar}`}>
						{messages.slice().reverse().map((message) => {
							return (
								<div key={message.id} className={styles.message}>
									{message.pseudo === pseudo && 
									<div className={styles.me}><span>{message.text}</span></div> ||
									<div className={styles.else}><span className={styles.pseudo}>{message.pseudo}: </span><span>{message.text}</span></div>}
								</div>
							);
						})}
					</div>
				</div>
				<div className={styles.write}>
					<form className={styles.chat} onSubmit={sendMessage}>
						<input
							className={styles.chat}
							type="text"
							placeholder="Message..."
							value={messageInput}
							onChange={(event) => {
								setMessageInput(event.target.value);
								emitTyping();
							}}
							autoFocus
						/>
						<button className={styles.chat} type="submit">Send</button>
					</form>
				</div>
			</div>

		</div>
	);

}

export default ChatRoom;
