import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaRestaurantMapPage } from './ba-restaurant-map';

@NgModule({
  declarations: [
    BaRestaurantMapPage,
  ],
  imports: [
    IonicPageModule.forChild(BaRestaurantMapPage),
  ],
})
export class BaRestaurantMapPageModule {}
