import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Answer } from '../interfaces';

@Component({
  selector: 'app-history-dialog',
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.scss']
})
export class HistoryDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<HistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Array<Answer>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
