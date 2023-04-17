import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';
import { UserDto } from './dto/user.dto';
import { Server, Socket } from 'socket.io';

// @WebSocketGateway( {cors: { origin: '*' }} ) // a voir pour autoriser une liste de CORS directement via Nginx
@WebSocketGateway({ path: '/socket-chat/', cors: { origin: '*' } })
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
		this.usersCount--;
		this.server.emit('countUser', this.usersCount);
		this.chatService.quitChat(client.id);
		this.server.emit('disconect', client.id);
	}

	@SubscribeMessage('findAllUsers')
	findAllUsers(): UserDto[] {
		return this.chatService.findAllUsers();
	}

	@SubscribeMessage('findAllMessages')
	findAllMessages(): MessageDto[] {
		return this.chatService.findAllMessages();
	}
  
	@SubscribeMessage('join')
	async joinRoom(@MessageBody('name') name: string, @ConnectedSocket() client: Socket): Promise<boolean> {
		console.log('join', name);
		await this.chatService.identify(name, client.id);
		const id: string = client.id;
		this.server.emit('join', {id, name});
		return true;
	}

	@SubscribeMessage('typing')
	async typing(@MessageBody('name') userTyping: string, @MessageBody('isTyping') isTyping: boolean): Promise<void>
	{
		await this.chatService.userIsTyping(userTyping, isTyping);
		// (a voir si on veut pas renvoyer juste le user qui commence/arrete a ecrire et laisser le client gerer le tableau)
		this.server.emit('typing', this.chatService.findAllUsersTyping());
	}

	@SubscribeMessage('createMessage')
	async create(@MessageBody() input: MessageDto, @ConnectedSocket() client: Socket): Promise<MessageDto> {
		const newMessage: MessageDto = await this.chatService.create(input, client.id);
		this.server.emit('message', newMessage);
		return newMessage;
	}
}
