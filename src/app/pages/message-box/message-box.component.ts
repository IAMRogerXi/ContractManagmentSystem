import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {

  message: string;

  constructor(private dialogRef: MatDialogRef<MessageBoxComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string) {
    this.message = this.data["message"];
  }

  ngOnInit() {
  }

  public onbtnCloseClick() {
    this.dialogRef.close();
  }

}

@NgModule({
  imports: [
  ],
  exports: [
    MessageBoxComponent
  ],
  declarations: [
    MessageBoxComponent
  ]
})
export class MessageBoxModule { }
