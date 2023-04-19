import { Injectable } from '@nestjs/common';
import { ChatMessageDto } from './dto/chat-message.dto';
import { ChatUserDto } from './dto/chat-user.dto';

@Injectable()
export class ChatService {
  messages: ChatMessageDto[] = [];
  clientToUser = new Map<string, string>();
  usersTyping: string[] = [];
  
  async create(message: ChatMessageDto, clientId: string): Promise<ChatMessageDto> {
    const newMessage: ChatMessageDto = {
      pseudo: this.clientToUser.get(clientId),
      text: message.text
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  // retourne un itérateur qui contient les clés de chaque élément de l'objet Map dans l'ordre d'insertion
  async identify(pseudo: string, clientId: string): Promise< IterableIterator<string> > {
    this.clientToUser.set(clientId, pseudo);
    return this.clientToUser.keys();
  }

  quitChat(clientId: string) {
	  this.clientToUser.delete(clientId);
  }

  // retourne le nom du client correspondante a la key (socket.id)
  getClientPseudo(clientId: string): string | undefined {
	  return this.clientToUser.get(clientId);
  }

  async userIsTyping(pseudo: string, isTyping: boolean): Promise<void> {
    if (isTyping === true)
      this.usersTyping.push(pseudo);
    else
      this.usersTyping = this.usersTyping.filter(user => user !== pseudo);
  }

  findAllUsersTyping(): string[] {
	  return this.usersTyping;
  }

  // vuejs doesnt implement Map (nor Set) type so we must return an array of object in our case
  findAllUsers(): ChatUserDto[] {
    return Array.from(this.clientToUser, ([id, pseudo]) => ({ id, pseudo }));
  }

  findAllMessages(): ChatMessageDto[] {
    return this.messages;
  }

}
