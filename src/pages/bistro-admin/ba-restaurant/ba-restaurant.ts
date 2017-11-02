import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from "../../../providers/bistro-admin/app-controller/app-controller";
import { Restaurant } from '../../../providers/bistro-admin/classes/restaurant';

@IonicPage()
@Component({
  selector: 'page-ba-restaurant',
  templateUrl: 'ba-restaurant.html',
})
export class BaRestaurantPage {
  restaurants: Array<Restaurant> = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appController: AppControllerProvider) {
  }

  ionViewDidLoad() {
    this.restaurants = this.appController.getRestauranController().getAllRestaurant();
    this.appController.getRestauranController().dataChange.subscribe(data => {
      this.restaurants = data;
    });
  }

  functionButtonClick(button) {
    if (button == "buttonAdd") {
      console.log("add");
    }
  }

  delete(restaurant: Restaurant) {
    let index = this.restaurants.findIndex(elm => {
      return elm.id == restaurant.id;
    })
    if (index > -1) {
      this.restaurants.splice(index, 1);
    }
  }


}
