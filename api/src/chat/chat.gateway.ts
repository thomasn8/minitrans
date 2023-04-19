import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { ChatMessageDto } from './dto/chat-message.dto';
import { ChatUserDto } from './dto/chat-user.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway( {cors: { origin: '*' }} ) // a voir pour autoriser une liste de CORS directement via Nginx
// @WebSocketGateway({ path: '/socket-chat/', cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
	@WebSocketServer() server: Server;
	constructor(private readonly chatService: ChatService) {}
	usersCount: number = 0;

	handleConnection(): void {
		console.log('handleConnection');
		this.usersCount++;
		this.server.emit('countUser', this.usersCount);
	}

	handleDisconnect(@ConnectedSocket() client: Socket): void {
		console.log('handleDisconnect');
		this.usersCount--;
		this.server.emit('countUser', this.usersCount);
		this.chatService.quitChat(client.id);
		this.server.emit('disconect', client.id);
	}

	@SubscribeMessage('findAllUsers')
	findAllUsers(): ChatUserDto[] {
		return this.chatService.findAllUsers();
	}

	@SubscribeMessage('findAllMessages')
	findAllMessages(): ChatMessageDto[] {
		return this.chatService.findAllMessages();
	}
  
	@SubscribeMessage('join')
	async joinRoom(@MessageBody('pseudo') pseudo: string, @ConnectedSocket() client: Socket): Promise<boolean> {
		await this.chatService.identify(pseudo, client.id);
		// console.log(client);
		const id: string = client.id;
		this.server.emit('join', {id, pseudo});
		return true;
	}

	@SubscribeMessage('typing')
	async typing(@MessageBody('pseudo') userTyping: string, @MessageBody('isTyping') isTyping: boolean): Promise<void>
	{
		await this.chatService.userIsTyping(userTyping, isTyping);
		// (a voir si on veut pas renvoyer juste le user qui commence/arrete a ecrire et laisser le client gerer le tableau)
		this.server.emit('typing', this.chatService.findAllUsersTyping());
	}

	@SubscribeMessage('createMessage')
	async create(@MessageBody() input: ChatMessageDto, @ConnectedSocket() client: Socket): Promise<ChatMessageDto> {
		const newMessage: ChatMessageDto = await this.chatService.create(input, client.id);
		this.server.emit('message', newMessage);
		return newMessage;
	}
}
