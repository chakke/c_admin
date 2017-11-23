import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProgressControllerProvider } from '../../../providers/bistro-admin/progress-controller/progress-controller';

@Component({
  selector: 'ba-progress',
  templateUrl: 'ba-progress.html'
})
export class BaProgressComponent {
  progress = 0;
  timePerequest = 3 //(ms) Add or  remove request will add or minus debounceTime
  debounceTime = 3; //each debounceTime(ms) increase progress by percentPerTime;
  percentPerTime = 0.1;
  isShowProgress = false;
  interval: any;
  timeOut: any;
  animating = false;
  private subscription: Subscription;
  constructor(private progressCtrl: ProgressControllerProvider) {
  }

  ngOnInit() {
    this.subscription = this.progressCtrl.loaderState
      .subscribe((event) => {
        switch (event) {
          case "show": this.showProgress(); break;
          case "hide": this.hideProgress(); break;
          case "speedUp": this.speedUpProgress(); break;
        }
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showProgress() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
      this.animating = false;
    }
    if (this.isShowProgress) {
      this.debounceTime += this.timePerequest;
    }
    this.isShowProgress = true;
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (this.progress < 95)
        this.progress += this.percentPerTime; 
    }, this.debounceTime)
  }

  hideProgress() {
    if (this.interval) clearInterval(this.interval);
    this.animating = true;
    this.progress = 100;
    if (this.timeOut) clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.isShowProgress = false;
      this.progress = 0;
      this.animating = false;
    }, 100)
  }

  speedUpProgress() {
    if (this.interval) clearInterval(this.interval);
    this.debounceTime -= this.timePerequest;
    if (this.debounceTime < this.timePerequest) this.debounceTime = this.timePerequest;
    this.interval = setInterval(() => {
      if (this.progress < 95)
        this.progress += this.percentPerTime; 
    }, this.debounceTime)
  }

}
