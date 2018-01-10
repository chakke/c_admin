import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Staff } from '../../../providers/bistro-admin/classes/staff';
import { AppControllerProvider } from '../../../providers/bistro-admin/app-controller/app-controller';
import { FunctionButtonName } from '../../../providers/bistro-admin/app-constant';

@IonicPage()
@Component({
  selector: 'page-ba-staff',
  templateUrl: 'ba-staff.html',
})
export class BaStaffPage {
  staffs: Array<Staff> = [];
  restId: string = "bistro";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appController: AppControllerProvider,
    private alertCtrl: AlertController) {
    if (this.navParams.get("restId")) {
      this.restId = this.navParams.get("restId");
    }
  }

  ionViewDidLoad() {
    this.appController.fetchStaffInRestaurant(this.restId).subscribe(data => {
      this.appController.mappingFirebaseData(this.staffs, data, Staff);
      console.log("fecthed staff data", this.staffs);
    })
  }

  functionButtonClick(button) {
    if (button == FunctionButtonName.BUTTON_ADD) {
      this.appController.pushPage("BaAddStaffPage", { restId: this.restId });
    }
  }

  gotoStaffDetail(staff) {
    this.appController.pushPage("BaStaffDetailPage", { "staffId": staff.id });
  }
  delete(staff) {
    let alert = this.alertCtrl.create({
      message: "Bạn có chắc chắn muốn xóa nhân viên này không? Hành động này không thể hoàn tác!",
      buttons: [{
        text: "Hủy",
        role: "cancel"
      }, {
        text: "Xóa", 
        handler: ()=>{
          this.appController.deleteStaff(this.restId, staff.id).then(success=>{
            this.appController.showToast("Xóa nhân viên thành công");
          }, error=>{
            this.appController.showToast("Xóa nhân viên thất bại, vui lòng thử lại sau");
          }
        );
        }
      }]
    });
    alert.present();
  }
 

}
