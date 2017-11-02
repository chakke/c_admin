import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProgressControllerProvider {
  private loaderSubject = new Subject<string>();
  loaderState = this.loaderSubject.asObservable();

  constructor() {
    // console.log("start fucker", Date.now());
    // setTimeout(() => {
    //   this.show();
    // }, 5000);

    // setTimeout(() => {
    //   this.show();
    // }, 6000)
    // setTimeout(() => {
    //   this.show();
    // }, 6500)
    // setTimeout(() => {
    //   this.show();
    // }, 7000)

    // setTimeout(() => {
    //   this.speedUp();
    // }, 8000)

    // setTimeout(() => {
    //   this.hide();
    //   console.log("end fucker", Date.now());
    // }, 8500)

  }

  show() {
    this.loaderSubject.next("show");
  }
  hide() {
    this.loaderSubject.next("hide");
  }
  speedUp() {
    this.loaderSubject.next("speedUp");
  }
}

