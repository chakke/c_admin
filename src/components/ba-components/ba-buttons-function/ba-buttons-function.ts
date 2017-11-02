import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ba-buttons-function',
  templateUrl: 'ba-buttons-function.html'
})
export class BaButtonsFunctionComponent {
  @Input()
  showButton: any = {
    buttonEdit: false,
    buttonRemove: false,
    buttonCheck: false
  };
  @Output()
  buttonClick = new EventEmitter<string>();

  constructor() {
  }

  click(button: string) {
    this.buttonClick.emit(button);
  }
}
