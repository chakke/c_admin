import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaTableDetailPage } from './ba-table-detail';

@NgModule({
  declarations: [
    BaTableDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BaTableDetailPage),
  ],
})
export class BaTableDetailPageModule {}
