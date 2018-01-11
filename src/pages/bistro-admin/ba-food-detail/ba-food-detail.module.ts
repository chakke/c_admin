import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaFoodDetailPage } from './ba-food-detail';

@NgModule({
  declarations: [
    BaFoodDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BaFoodDetailPage),
  ],
})
export class BaFoodDetailPageModule {}
