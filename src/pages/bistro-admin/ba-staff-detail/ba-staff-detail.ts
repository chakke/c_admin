import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Staff } from '../../../providers/bistro-admin/classes/staff';
import { AppControllerProvider } from '../../../providers/bistro-admin/app-controller/app-controller';
import { STAFF_ROLE_NAME, STAFF_TYPE_NAME, FunctionButtonName } from '../../../providers/bistro-admin/app-constant';
import { Utils } from '../../../providers/app-utils';


@IonicPage({ segment: 'staff-detail/:staffId' })
@Component({
  selector: 'page-ba-staff-detail',
  templateUrl: 'ba-staff-detail.html',
})
export class BaStaffDetailPage {
  staff: Staff;
  restId = "bistro";
  staffId = "";
  roleData = [];
  typeData = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appController: AppControllerProvider) {
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
    if (this.navParams.get("staffId")) {
      this.staffId = this.navParams.get("staffId");
      this.appController.getStaffById(this.restId, this.staffId).then(staff => {
        this.staff = staff;
      }, error => {
        console.log("Get staff error", error);
      })
    }
  }

  functionButtonClick(button) {
    if (button == FunctionButtonName.BUTTON_CHECK) {
      this.appController.updateStaff(this.restId, this.staffId, {
        name: this.staff.name,
        phone: this.staff.phone,
        birthday: this.staff.birthDay,
        staff_role: this.staff.staffRole,
        staff_type: this.staff.staffType
      }).then((success)=>{
        this.appController.showToast("Chỉnh sửa nhân viên thành công");
      }, error=>{
        this.appController.showToast("Chỉnh sửa nhân viên thất bại, vui lòng thử lại sau");
      })
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
