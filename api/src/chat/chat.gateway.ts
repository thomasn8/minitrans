import { NotFoundException } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { ChatService } from './chat.service';

import { ChatUserDto, ChatUserResponseDto } from './dto/chat-user.dto';
import { ChatMessageDto } from './dto/chat-message.dto';


@WebSocketGateway({ path: '/socket-chat/', cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
	@WebSocketServer() server: Server;
	constructor(private readonly chatService: ChatService) {}
	usersCount: number = 0;


	handleConnection(@ConnectedSocket() client: Socket): void {

		// check bearer token against user db to see if user is known
		// if no, disconnect ths client socket

		console.log('Connect:', client.id, 'pseudo:',client.handshake.headers.pseudo);
		this.usersCount++;
		this.server.emit('countUsers', this.usersCount);

		// provisory (later will use token login infos)
		if (client.handshake.headers.pseudo) {
			const user: ChatUserDto = new ChatUserDto();
			const pseudo: string = (client.handshake.headers.pseudo).toString();		// CHEAT (provisory)
			const id = this.usersCount;																							// CHEAT (provisory)

			user.socket = client;
			user.id = id;
			user.pseudo = pseudo;

			this.chatService.identify(user);
			this.server.emit('newClient', {id, pseudo});
		}
	}

	handleDisconnect(@ConnectedSocket() client: Socket): void {
		console.log('Disconnect:', client.id);
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
