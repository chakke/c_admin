import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppControllerProvider } from "../../../providers/bistro-admin/app-controller/app-controller";
import { Restaurant } from "../../../providers/bistro-admin/classes/restaurant";
import { AssetsUrl } from '../../../providers/bistro-admin/app-constant';

declare var ClassicEditor: any;

@IonicPage({ segment: 'restaurant-detail/:id' })
@Component({
  selector: 'page-ba-restaurant-detail',
  templateUrl: 'ba-restaurant-detail.html'
})
export class BaRestaurantDetailPage {
  title = "Chi tiết nhà hàng";
  restaurant: Restaurant;
  defaultLogo: string = "";
  logoName: string = "Chưa chọn ảnh nào";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private appController: AppControllerProvider) {
    this.defaultLogo = AssetsUrl.DEFAULT_LOGO;
  }

  ionViewDidLoad() {

    if (this.navParams.get("id")) {
      this.appController.getRestauranById(this.navParams.get("id")).then(restaurant => {
        this.restaurant = restaurant; 
        if (this.restaurant.image) {
          let lastIndex = this.restaurant.image.lastIndexOf("/");
          if (lastIndex > -1) {
            this.logoName = this.restaurant.image.substring(lastIndex + 1, this.restaurant.image.length);
          } else {
            this.logoName = "";
          }
        }
      });
    }
    else { 
      this.restaurant = new Restaurant(0,this.appController.getVendor(),"","");
    }
  }

  ionViewDidEnter() {
    let btnSelectImage = <HTMLInputElement>document.getElementById('selectImageBtn');

    if (btnSelectImage) {
      btnSelectImage.addEventListener('change', () => {
        if (btnSelectImage.files && btnSelectImage.files[0]) {
          let reader = new FileReader();
          reader.onload = (event) => {
            this.restaurant.image = (<any>event.target).result;
            this.logoName = btnSelectImage.files[0].name;
          }
          reader.readAsDataURL(btnSelectImage.files[0]);
        }
      })
    }
    let vendorDesc = document.getElementById("restaurant-desc");
    ClassicEditor
      .create(vendorDesc)
      .catch(error => {
        console.error(error);
      });
  }

  removeLogo() {
    if (this.restaurant)
      this.restaurant.image = "";
    this.logoName = "Chưa chọn ảnh nào";
  }

  functionButtonClick(button) { 
    this.appController.setRootPage("BaRestaurantPage");
  }

}
