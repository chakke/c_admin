import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaAddTablePage } from './ba-add-table';

@NgModule({
  declarations: [
    BaAddTablePage,
  ],
  imports: [
    IonicPageModule.forChild(BaAddTablePage),
  ],
})
export class BaAddTablePageModule {}
