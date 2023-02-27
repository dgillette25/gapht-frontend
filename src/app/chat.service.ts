import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  prompt: String = '';
  conversation: String = '';

  constructor() { }

  setPrompt(prompt: String) {
    this.prompt = prompt
  }

  setConversation(conversation: String) {
    this.conversation = conversation
  }

  getPrompt() : String {
    return this.prompt;
  }

  getConversation() : String {
    return this.conversation;
  }

  clear() : void {
    this.conversation = '';
    this.prompt = '';
  }
}
