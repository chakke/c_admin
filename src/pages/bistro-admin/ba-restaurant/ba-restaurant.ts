import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from "../../../providers/bistro-admin/app-controller/app-controller";
import { Restaurant } from '../../../providers/bistro-admin/classes/restaurant';
import { FunctionButtonName } from '../../../providers/bistro-admin/app-constant';


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
    if (this.restaurants.length > 30)
      this.restaurants.splice(30, this.restaurants.length - 30);
    this.appController.getRestauranController().dataChange.subscribe(data => {
      this.restaurants = data;
      if (this.restaurants.length > 30)
        this.restaurants.splice(30, this.restaurants.length - 30);
    });
  }

  functionButtonClick(button) {
    if (button == FunctionButtonName.BUTTON_ADD) {
      this.appController.pushPage("BaRestaurantDetailPage");
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

  gotoRestaurantDetail(restaurantId: number) {
    this.appController.pushPage("BaRestaurantDetailPage", { id: restaurantId });

  }


}
