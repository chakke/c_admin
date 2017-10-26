import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaLoginPage } from './ba-login';

@NgModule({
  declarations: [
    BaLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(BaLoginPage),
  ],
})
export class BaLoginPageModule {}
