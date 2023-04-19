import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatMessageDto } from './dto/chat-message.dto';
import { ChatUserDto, ChatUserResponseDto } from './dto/chat-user.dto';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {

  // REINITIALISER CES DATAS CHAQUE JOUR A 00:00
  users = new Map<string, ChatUserDto>();
  messages: ChatMessageDto[] = [];
  usersTyping: string[] = []; 


  // return an iterator based on users keys begining
  async identify(user: ChatUserDto): Promise< IterableIterator<string> > {
    this.users.set(user.socket.id, user);
    return this.users.keys();
  }

  async quitChat(socketId: string): Promise<number> {
    const user: ChatUserDto | undefined = this.users.get(socketId);
    if (user === undefined)
      throw new NotFoundException('User not found');
    const userId: number = user.id;
    this.users.delete(socketId);
    return userId;
  }

  findAllUsers(): ChatUserResponseDto[] {
    let usersArray: ChatUserResponseDto[] = [];
    this.users.forEach((user) => {
      usersArray.push({id: user.id, pseudo: user.pseudo});
    });
    return usersArray;
  }

  findAllMessages(): ChatMessageDto[] {
    return this.messages;
  }
  
  async getMessage(socketId: string, message: ChatMessageDto): Promise<ChatMessageDto | null> {
    const user: ChatUserDto | undefined = this.users.get(socketId);
    if (user && user.pseudo === message.pseudo) {
      this.messages.push(message);
      return message;
    }
    return null;
  }

  // A FINIR
  async isTyping(pseudo: string, isTyping: boolean): Promise<void> {
    if (isTyping === true)
      this.usersTyping.push(pseudo);
    else
      this.usersTyping = this.usersTyping.filter(user => user !== pseudo);
  }

  findAllUsersTyping(): string[] {
	  return this.usersTyping;
  }

}
