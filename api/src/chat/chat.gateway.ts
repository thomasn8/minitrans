import { NotFoundException } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { ChatService } from './chat.service';

import { ChatUserDto, ChatUserResponseDto } from './dto/chat-user.dto';
import { ChatMessageDto } from './dto/chat-message.dto';

// @WebSocketGateway( {cors: { origin: '*' }} )
@WebSocketGateway({ path: '/socket-chat/', cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
	@WebSocketServer() server: Server;
	constructor(private readonly chatService: ChatService) {}
	usersCount: number = 0;


	async handleConnection(@ConnectedSocket() client: Socket): Promise<void> {
		console.log('handleConnection', client.id, client.handshake.headers.pseudo);
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

			await this.chatService.identify(user);
			this.server.emit('newClient', {id, pseudo});
		}
	}

	async handleDisconnect(@ConnectedSocket() client: Socket): Promise<void> {
		console.log('handleDisconnect');
		const userId: number = await this.chatService.quitChat(client.id).catch((err) => {
			throw new NotFoundException(err);
		})
		this.usersCount--;
		this.server.emit('countUsers', this.usersCount);
		this.server.emit('disconect', userId);
	}



	@SubscribeMessage('findAllUsers')
	findAllUsers(): ChatUserResponseDto[] {
		return this.chatService.findAllUsers();
	}

	@SubscribeMessage('findAllMessages')
	findAllMessages(): ChatMessageDto[] {
		return this.chatService.findAllMessages();
	}



	@SubscribeMessage('message')
	async getMessage(@ConnectedSocket() client: Socket, @MessageBody() message: ChatMessageDto): Promise<void> {
		const newMessage: ChatMessageDto | null = await this.chatService.getMessage(client.id, message);
		if (newMessage !== null) {
			this.server.emit('broadcastMessage', newMessage);
		}
	}


	// A FINIR
	@SubscribeMessage('isTyping')
	async isTyping(@MessageBody('pseudo') userTyping: string, @MessageBody('isTyping') isTyping: boolean): Promise<void>
	{
		await this.chatService.isTyping(userTyping, isTyping);
		// (a voir si on veut pas renvoyer juste le user qui commence/arrete a ecrire et laisser le client gerer le tableau)
		this.server.emit('isTyping', this.chatService.findAllUsersTyping());
	}


}
