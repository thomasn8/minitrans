import React, { SyntheticEvent } from "react";
import { useLoginRedirect } from "../login/useRedirect";
import { LoginDto } from "../../dto/login-dto";
import Nav from "../nav/Nav";
import { io, Socket } from 'socket.io-client';

import '../../assets/css/chat.css';
import { UserDto } from "../../dto/user-dto";

interface ChatPageProps {
	loggedUser: LoginDto | undefined;
}

interface ChatUserDto {
	id: number,
	pseudo: string,
}

interface MessageDto {
	pseudo: string | undefined;
	text: string;
}

function ChatPage({loggedUser}: ChatPageProps) {

	useLoginRedirect(loggedUser);

	// const socket = io('http://localhost:4000');
	const socketRef = React.useRef<Socket>();

	const [pseudo, setPseudo] = React.useState('');
	const [errorMessage, seterrorMessage] = React.useState('');
	function handleSubmitPseudo(event: SyntheticEvent) {
		event.preventDefault()

		console.log('pseudo:', pseudo);

		// validation pseudoInput
			// max 25 char long, char autorized: printable
		// si ok pseudo = pseudoInput

		// ...

		joinChat();
		// setJoined(true);
	}


	const [joined, setJoined] = React.useState(false);
	const [usersCount, setUsersCount] = React.useState('');
	const [users, setUsers] = React.useState<ChatUserDto[]>([]);
	const [typing, setTyping] = React.useState(false);
	const [usersTyping, setUsersTyping] = React.useState<string[]>([]);
	const [messages, setMessages] = React.useState<MessageDto[]>([]);
	const [messageInput, setMessageInput] = React.useState('');

	React.useEffect(() => {

		if (socketRef.current === undefined) {
			socketRef.current = io('http://localhost:4000');
			// socketRef.current = io("", {
			// 	path: "/socket-chat/",
			// 	timeout: 10000,
			// 	// extraHeaders: {
			// 	// 	Authorization: `Bearer ${token}`,
			// 	// },
			// });
			console.log(socketRef.current);
			if (socketRef.current.connected === true)
				console.log('CONNECTED');
			else
				console.log('NOT CONNECTED');

			socketRef.current && socketRef.current.emit('findAllUsers', {}, (res: UserDto[]) => {
				setUsers(res);
			})
		
			socketRef.current && socketRef.current.emit('findAllMessages', {}, (res: MessageDto[]) => {
				setMessages(res);
			})
		
			socketRef.current && socketRef.current.on('countUser', (res: number) => {
				let wordUser: string;
				res > 1 ? wordUser = 'users' : wordUser = 'user'
				setUsersCount(`${res} wordUser`)
			})
		
			socketRef.current && socketRef.current.on('join', (res: ChatUserDto) => {
				setUsers([...users, res]);
				if (res.pseudo === pseudo) {
					setJoined(true);
					console.log('chat joined');
				}
			})
		
			socketRef.current && socketRef.current.on('disconect', (res: number) => {
				setUsers(users.filter(user => user.id !== res));
			})
		
			socketRef.current && socketRef.current.on('message', (res: MessageDto) => {
				setMessages([...messages, res]);
			})
			
			socketRef.current && socketRef.current.on('typing', (res: string[]) => {
				setUsersTyping(res);
			})

		}

	// }, [users, messages, usersCount, usersTyping, ]);
	}, []);


	function joinChat() {
		console.log(pseudo + ' try to join chat');
		socketRef.current && socketRef.current.emit('join', { pseudo: pseudo }, () => {
			// setJoined(true);
		})
	};

	function sendMessage() {
		socketRef.current && socketRef.current.emit('createMessage', { text: messageInput }, () => {
			setMessageInput('');
		})
	};

	function emitTyping(messageInput: string) {
		setMessageInput(messageInput);

		if (typing === false) {
			setTyping(true);
			socketRef.current && socketRef.current.emit('typing', { name: pseudo, isTyping: true } );
			
			setTimeout (() => {
				socketRef.current && socketRef.current.emit('typing', { name: pseudo, isTyping: false } );
				setTyping(false);
			}, 5000);
		}
	}

	return (
		<div id="chat">

			{joined === false &&
			<>
			<h1 className="title">Chat</h1>
			<Nav />

			<form onSubmit={handleSubmitPseudo}>
				<input
					type="text"
					placeholder="Pseudo"
					value={pseudo}
					onChange={(event) => setPseudo(event.target.value)}
					autoFocus
				/>
				<button type="submit">Enter</button>
			</form>
			<p className="error-message">{errorMessage}error</p>
			</>
			
			||
			
			(<>
			<div className="chat-container">

			<div className="users-container">
					<div className="count">{usersCount}</div>
					<div className="users-wrapper scrollbar">
						<div className="users">
							{users.map((user) => {
								return (
									<div className="user-wrapper">
										{usersTyping.find(userTyping => {
											(userTyping === user.pseudo && userTyping !== pseudo && <span className="typing"></span>) ||
											(userTyping === user.pseudo && userTyping === pseudo && <span className="me-typing"></span>) 
										})}

										{user.pseudo === pseudo &&
										<span className="user me">{user.pseudo} (me)</span> ||
										<span className="user else">{user.pseudo}</span>}
										<span className="lister">•</span>
									</div>
								);
							})}
						</div>
					</div>
				</div>

				<div className="messages-container">
					<div className="title">Chat</div>
					<div className="messages-wrapper">
						<div className="messages scrollbar">
							{messages.slice().reverse().map((message) => {
								return (
									<div className="message">
										{message.pseudo === pseudo && 
										<div className="name me"><span>{message.text}</span></div> ||
										<div className="name else"><span className="else-name">{message.pseudo}: </span><span>{message.text}</span></div>}
									</div>
								);
							})}
						</div>
					</div>
					<div className="write">
						<form onSubmit={sendMessage}>
							<input
								type="text"
								placeholder="Message..."
								value={messageInput}
								// onChange={(event) => setMessageInput(event.target.value)}
								onChange={(event) => emitTyping(event.target.value)}
								autoFocus
							/>
							<button type="submit">Send</button>
						</form>
					</div>
				</div>

			</div>
			</>)
			}

		</div>
	);

}

export default ChatPage;
