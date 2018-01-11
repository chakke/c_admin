import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Food } from '../../../providers/bistro-admin/classes/food';
import { AppControllerProvider } from '../../../providers/bistro-admin/app-controller/app-controller';
import { FunctionButtonName } from '../../../providers/bistro-admin/app-constant';

@IonicPage()
@Component({
  selector: 'page-ba-foods',
  templateUrl: 'ba-foods.html',
})
export class BaFoodsPage {
  restId: string = "bistro";
  foods: Array<Food> = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appController: AppControllerProvider) {
  }

  ionViewDidLoad() {
    this.appController.fetchFoodInRestaurant(this.restId).subscribe(data => {
      this.appController.mappingFirebaseFetchedData(this.foods, data, Food);
    })
  }

  functionButtonClick(button) {
    if(button == FunctionButtonName.BUTTON_ADD){
      this.appController.pushPage("BaAddFoodPage", {"restId": this.restId});
    }
  }
}
