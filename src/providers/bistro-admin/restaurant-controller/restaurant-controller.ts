import { Injectable } from '@angular/core';
import { Restaurant } from "../classes/restaurant";
import { Vendor } from "../classes/vendor";
import { User } from "../classes/user";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RestaurantControllerProvider {
  restaurants: Array<Restaurant> = [];
  private restaurantSubject = new Subject<Array<Restaurant>>();
  public dataChange = this.restaurantSubject.asObservable();

  constructor() {
  }

  updateData(data, vendor?: Vendor, user?: User) {
    this.resetData();
    if (data && data.length) {
      for (let restaurant of data) {
        let temUser = user ? user : new User("");
        let temVendor = vendor ? vendor : new Vendor(restaurant["vendor_id"], temUser, "");
        let temRestaurant = new Restaurant(restaurant["rest_id"]
          , temVendor, restaurant["restaurant_name"], restaurant["restaurant_email"]);
        this.restaurants.push(temRestaurant);
      }
      this.broadcastChange(this.restaurants); 
    }
  }

  broadcastChange(data) {
    this.restaurantSubject.next(data);
    console.log("hey your restaurant changed", data);
  }

  resetData() {
    this.restaurants = [];
  }

  getAllRestaurant(): Array<Restaurant> {
    return this.restaurants;
  }

}
