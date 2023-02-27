import { Component } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import axios from 'axios';
import { ChatService } from '../chat.service';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent {
  conversation = this.chatService;
  chatForm = this.formBuilder.group(this.chatService);
  loading = false;

  constructor(
    private chatService: ChatService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  clearChat(): void {
    this.conversation.clear();

  }

  onSubmit(): void {
    let chat = this.chatForm.value;
    chat.prompt = chat.prompt;
    this.conversation.setPrompt(
      this.conversation.getConversation() + "\n\n" + chat.prompt
    );
    console.log(this.conversation);
    this.loading = true;

    
    axios.post(`${environment.apiUrl}/completions`, this.conversation)
        .then(response => {
          this.loading = false;
          this.conversation.setConversation(response.data.result);
        })
        .catch(error => {
          this.loading = false;
          this._snackBar.open("Sorry there was an issue", "Close")
        });
    
    this.chatForm.reset();
  }
}

