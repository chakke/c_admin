import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
    private appController: AppControllerProvider,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.appController.fetchFoodInRestaurant(this.restId).subscribe(data => {
      this.appController.mappingFirebaseFetchedData(this.foods, data, Food);
    })
  }

  functionButtonClick(button) {
    if (button == FunctionButtonName.BUTTON_ADD) {
      this.appController.pushPage("BaAddFoodPage", { "restId": this.restId });
    }
  }

  gotoFoodDetail(food) {
    this.appController.pushPage("BaFoodDetailPage", {
      foodId: food.id
    })
  }

  delete(food) {
    let alert = this.alertCtrl.create({
      message: "Bạn có chắc chắn muốn xóa món này không? Hành động này không thể hoàn tác!",
      buttons: [{
        text: "Hủy",
        role: "cancel"
      }, {
        text: "Xóa",
        handler: () => {
          this.appController.deleteFood(this.restId, food.id).then(success => {
            this.appController.showToast("Xóa món thành công");
          }, error => {
            this.appController.showToast("Xóa món thất bại, vui lòng thử lại sau");
          });
        }
      }]
    });
    alert.present();
  }
}
