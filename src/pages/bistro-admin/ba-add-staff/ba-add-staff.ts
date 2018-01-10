import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Staff } from '../../../providers/bistro-admin/classes/staff';
import { STAFF_ROLE_NAME, STAFF_TYPE_NAME, FunctionButtonName } from '../../../providers/bistro-admin/app-constant';
import { AppControllerProvider } from '../../../providers/bistro-admin/app-controller/app-controller';
import { Utils } from '../../../providers/app-utils';



@IonicPage({ segment: 'ba-add-staff/:restId' })
@Component({
  selector: 'page-ba-add-staff',
  templateUrl: 'ba-add-staff.html',
})
export class BaAddStaffPage {
  restId: string = "";
  staff: Staff;
  roleData = [];
  typeData = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appController: AppControllerProvider,
    public alertCtrl: AlertController,
  ) {
    if (this.navParams.get("restId")) {
      this.restId = this.navParams.get("restId");
    }
    this.staff = new Staff();
    for (const key in STAFF_ROLE_NAME) {
      if (STAFF_ROLE_NAME.hasOwnProperty(key)) {
        const element = STAFF_ROLE_NAME[key];
        this.roleData.push({
          id: key,
          name: element
        })
      }
    }
    for (const key in STAFF_TYPE_NAME) {
      if (STAFF_TYPE_NAME.hasOwnProperty(key)) {
        const element = STAFF_TYPE_NAME[key];
        this.typeData.push({
          id: key,
          name: element
        })
      }
    }
  }

  ionViewDidLoad() {

  }

  functionButtonClick(button) {
    if (button == FunctionButtonName.BUTTON_CHECK) {
      if (Utils.isValidEmail(this.staff.email)) {
        this.appController.getStaffByEmail(this.restId, this.staff.email).then(staffs => {
          if (staffs && staffs.length > 0) {
            this.alertCtrl.create({
              message: "Email đã được sử dụng"
            }).present();
          } else {
            this.appController.createUserWithEmailAndPassword(this.staff.email).then(data => {
              console.log("create user success", data);
            }, error => {
              console.log("create user error", error);
            }).catch(error => {
              console.log("create user catch error", error);
            })
            this.appController.addStaffToRestaurant(this.restId, this.staff).then(data => {
              console.log("Add user success");
              this.appController.showToast("Thêm nhân viên thành công");
              this.gotoListStaffPage();
            }, error => {
              console.log("add user error", error);
              this.appController.showToast("Thêm nhân viên thất bại, vui lòng thử lại sau");
              this.gotoListStaffPage();
            });
          }
        })
      } else {
        this.alertCtrl.create({
          message: "Email không hợp lệ",
          buttons: [{
            text: "OK"
          }]
        }).present();
      }
    } else {
      this.gotoListStaffPage();
    }
  }

  gotoListStaffPage() {
    this.appController.setRootPage("BaStaffPage", {
      restId: this.restId
    })
  }
}
