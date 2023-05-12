import { Component } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import axios from 'axios';
import { ChatService } from '../chat.service';
import { HistoryService } from '../history.service';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HistoryDialogComponent } from '../history-dialog/history-dialog.component';
import { Answer } from '../interfaces';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent {
  chat = this.chatService;
  history = this.historyService;
  chatForm = this.formBuilder.group(this.chatService);
  loading = false;
  test = this.loadChats();

  constructor(
    private chatService: ChatService,
    private historyService: HistoryService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  clearChat(): void {
    this.chat.clear();
  }

  async getChat(answer: any) {
    this.chatService.setConversation(answer.result);
    this.chatService.setId(answer._links.answer.href.match(/\d+$/)[0]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(HistoryDialogComponent, {
      data: this.history,
    });
  }
  
  async loadChats() {
    let response = await axios.get(`${environment.apiUrl}/answers/search/findByUuid?uuid=`)
    this.history.set(response.data._embedded.answers);
  }

  onSubmit(): void {
    let stateChat = this.chatForm.value;
    this.chat.setPrompt(
      this.chat.getConversation() + "\n\n" + stateChat.prompt
    );
    console.log(this.chat);
    this.loading = true;

    
    axios.post(`${environment.apiUrl}/completions/`, this.chat)
        .then(response => {
          this.chat.setId(response.data.id);
          this.chat.setConversation(response.data.result);
          this.chat.setUuid(response.data.uuid);
          this.loadChats();
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          this._snackBar.open("Sorry there was an issue", "Close")
        });
    
    this.chatForm.reset();
  }
}

