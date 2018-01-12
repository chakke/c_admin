import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Staff } from '../../../providers/bistro-admin/classes/staff';
import { AppControllerProvider } from '../../../providers/bistro-admin/app-controller/app-controller';
import { FunctionButtonName } from '../../../providers/bistro-admin/app-constant';
import * as XLSX from 'xlsx';
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
    private alertCtrl: AlertController,
    public modalCtrl: ModalController) {
    if (this.navParams.get("restId")) {
      this.restId = this.navParams.get("restId");
    }
  }

  ionViewDidLoad() {
    this.appController.fetchStaffInRestaurant(this.restId).subscribe(data => {
      this.appController.mappingFirebaseFetchedData(this.staffs, data, Staff);
      console.log("fecthed staff data", this.staffs);
    })
  }

  functionButtonClick(button) {
    if (button == FunctionButtonName.BUTTON_ADD) {
      this.appController.pushPage("BaAddStaffPage", { restId: this.restId });
    }
    if (button == FunctionButtonName.BUTTON_IMPORT) {
      let modal = this.modalCtrl.create("ChooseFilePage", {
        title: "Chọn file excel để import dữ liệu",
        accept: ".xls,.xlsx"
      });
      modal.present();
      modal.onDidDismiss((data) => {
        if (data && data.file) {
          var rABS = true;
          let reader = new FileReader();
          reader.onload = (event) => {
            var data = (<any>event).target.result;
            if (!rABS) data = new Uint8Array(data);
            var workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' });
            for (const key in workbook.Sheets) {
              if (workbook.Sheets.hasOwnProperty(key)) {
                const sheet = workbook.Sheets[key];
                console.log(XLSX.utils.sheet_to_json(sheet));
              }
            }
          }
          if (rABS) reader.readAsBinaryString(data.file);
          else reader.readAsArrayBuffer(data.file);
        }
      })
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
        handler: () => {
          this.appController.deleteStaff(this.restId, staff.id).then(success => {
            this.appController.showToast("Xóa nhân viên thành công");
          }, error => {
            this.appController.showToast("Xóa nhân viên thất bại, vui lòng thử lại sau");
          }
          );
        }
      }]
    });
    alert.present();
  }


}
