import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  id: Number | null = null;
  prompt: String = '';
  conversation: String = '';
  uuid: String = '';

  constructor() { 
    let uuid = localStorage.getItem('uuid');
    console.log(uuid);
    if (uuid != null) {
      this.uuid = uuid;
    }
  }

  setId(id: Number) {
    this.id = id
  }

  setPrompt(prompt: String) {
    this.prompt = prompt
  }

  setUuid(uuid: string) {
    localStorage.setItem('uuid', uuid);
    this.uuid = uuid
  }

  setConversation(conversation: String) {
    this.conversation = conversation
  }

  getId() : Number | null {
    return this.id;
  }

  getPrompt() : String {
    return this.prompt;
  }

  getUuid() : String {
    return this.uuid;
  }

  getConversation() : String {
    return this.conversation;
  }

  clear() : void {
    this.id = null;
    this.conversation = '';
    this.prompt = '';
  }
}
