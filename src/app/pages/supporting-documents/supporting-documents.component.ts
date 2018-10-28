import { NgModule, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supporting-documents',
  templateUrl: './supporting-documents.component.html',
  styleUrls: ['./supporting-documents.component.css']
})
export class SupportingDocumentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@NgModule({
  imports: [],
  exports: [
    SupportingDocumentsComponent
  ],
  declarations: [
    SupportingDocumentsComponent
  ]
})
export class SupportingDocumentsModule { }
