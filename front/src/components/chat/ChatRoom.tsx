import React, { SyntheticEvent } from "react";
import { LoginDto } from "../../dto/login-dto";
import Nav from "../nav/Nav";

import { io, Socket } from 'socket.io-client';
import { ChatUserDto } from "./dto/chat-user.dto";
import { ChatMessageDto } from "./dto/chat-message.dto";

import '../../assets/css/chat.css';

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

			socketRef.current = io('http://localhost:4000');

			socketRef.current && socketRef.current.emit('join', { pseudo: pseudo }, () => {
				// console.log(pseudo + ' try to join chat');
			})

			socketRef.current && socketRef.current.emit('findAllUsers', {}, (res: ChatUserDto[]) => {
				setUsers(res);
			})
		
			socketRef.current && socketRef.current.emit('findAllMessages', {}, (res: ChatMessageDto[]) => {
				setMessages(res);
			})

			socketRef.current && socketRef.current.on('countUser', (res: number) => {
				let wordUser: string;
				res > 1 ? wordUser = 'users' : wordUser = 'user'
				setUsersCount(res + ' ' + wordUser);
			})

		}

	}, [user, pseudo]);

	socketRef.current && socketRef.current.on('join', (res: ChatUserDto) => {
		console.log(res.id, 'joined chat');
		setUsers([...users, res]);
	})

	socketRef.current && socketRef.current.on('disconect', (res: string) => {
		setUsers(users.filter(user => user.id !== res));
	})

	socketRef.current && socketRef.current.on('message', (res: ChatMessageDto) => {
		setMessages([...messages, res]);
	})
	
	socketRef.current && socketRef.current.on('typing', (res: string[]) => {
		console.log('someone is typing');
		setUsersTyping(res);
	})

	function sendMessage(event: SyntheticEvent) {
		event.preventDefault()
		// validation
		socketRef.current && socketRef.current.emit('createMessage', { text: messageInput }, () => {
			setMessageInput('');
		})
	};

	// let typing = false;
	function emitTyping() {
		if (typing === false) {
			setTyping(true);
			// typing = true;
			socketRef.current && socketRef.current.emit('typing', { name: pseudo, isTyping: true } );
			
			let timeout = setTimeout (() => {
				socketRef.current && socketRef.current.emit('typing', { name: pseudo, isTyping: false } );
				setTyping(false);
				// typing = false;
			}, 5000);
		}
	}


	return (
		<div className="chat-container">		

			<div className="users-container">
				<div className="count">
					{usersCount}
				</div>
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
				<div className="title-chat">
					Chat
				</div>
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
							onChange={(event) => {
								setMessageInput(event.target.value);
								emitTyping();
							}}
							autoFocus
						/>
						<button type="submit">Send</button>
					</form>
				</div>
			</div>

		</div>
	);

}

export default ChatRoom;
