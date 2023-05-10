import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { ChatService } from './chat.service';

import { ChatUserDto, ChatUserResponseDto } from './dto/chat-user.dto';
import { ChatMessageDto } from './dto/chat-message.dto';

import * as jwt from 'jsonwebtoken'


@WebSocketGateway({ path: '/socket-chat/', cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
	@WebSocketServer() server: Server;
	constructor(private readonly chatService: ChatService) {}
	usersCount: number = 0;

	handleConnection(@ConnectedSocket() client: Socket): void {
		if (client.handshake.headers.authorization && process.env.ACCESSTOKEN_SECRET) {
			const jwtUser = jwt.verify(client.handshake.headers.authorization, process.env.ACCESSTOKEN_SECRET) as ChatUserDto;
			const user: ChatUserDto = {
				id: jwtUser.id,
				pseudo: jwtUser.pseudo,
				element: jwtUser.element,
				socket: client
			}
			console.log(`Connect to chat: ${user.pseudo} (${user.socket.id})`);
			this.usersCount++;
			this.server.emit('countUsers', this.usersCount);
			this.chatService.identify(user);
			this.server.emit('newClient', {id: user.id, pseudo: user.pseudo, element: user.element});
		}
		else {
			client.disconnect();
		}
	}

	handleDisconnect(@ConnectedSocket() client: Socket): void {
		console.log('Disconnect from chat:', client.id);
		try {
			const userId: number = this.chatService.quitChat(client.id);
			this.usersCount--;
			this.server.emit('countUsers', this.usersCount);
			this.server.emit('disconect', userId);
		} catch (err) {
			console.log('User not found:', client);
		}
	}


	@SubscribeMessage('findAllUsers')
	findAllUsers(): ChatUserResponseDto[] {
		return this.chatService.findAllUsers();
	}

	@SubscribeMessage('findAllMessages')
	findAllMessages(): ChatMessageDto[] {
		return this.chatService.findAllMessages();
	}

	@SubscribeMessage('createMessage')
	createMessage(@ConnectedSocket() client: Socket, @MessageBody() message: ChatMessageDto): void {
		const newMessage: ChatMessageDto | null = this.chatService.createMessage(client.id, message);
		if (newMessage !== null) {
			this.server.emit('broadcastMessage', newMessage);
		}
	}

	@SubscribeMessage('isTyping')
	isTyping(@MessageBody('pseudo') pseudo: string): void
	{
		this.server.emit('isTyping', pseudo);
	}

	@SubscribeMessage('stopTyping')
	stopTyping(@MessageBody('pseudo') pseudo: string): void
	{
		this.server.emit('stopTyping', pseudo);
	}

}
