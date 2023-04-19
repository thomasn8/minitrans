import { Socket } from 'socket.io';

export class ChatUserDto {
	socket: Socket;
	id: number;
	pseudo: string;
}

export class ChatUserResponseDto {
	id: number;
	pseudo: string;
}
