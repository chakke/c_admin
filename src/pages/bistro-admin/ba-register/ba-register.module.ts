import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaRegisterPage } from './ba-register';

@NgModule({
  declarations: [
    BaRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(BaRegisterPage),
  ],
})
export class BaRegisterPageModule {}
