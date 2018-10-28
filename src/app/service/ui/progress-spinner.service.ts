import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressSpinnerService {

  constructor() { }

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  public start() {
    this.change.emit(true);
  }

  public complete() {
    this.change.emit(false);
  }

}
