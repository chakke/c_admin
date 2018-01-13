import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Table } from '../../../providers/bistro-admin/classes/table';
import { AppControllerProvider } from '../../../providers/bistro-admin/app-controller/app-controller';
import { FunctionButtonName } from '../../../providers/bistro-admin/app-constant';

@IonicPage({ segment: 'ba-tables/:restId/:restName' })
@Component({
  selector: 'page-ba-tables',
  templateUrl: 'ba-tables.html',
})
export class BaTablesPage {
  restId = "";
  restName = "";
  tables: Array<Table> = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appController: AppControllerProvider) {
    if (this.navParams.get("restId")) {
      this.restId = this.navParams.get("restId");
    }
    if (this.navParams.get("restName")) {
      this.restName = this.navParams.get("restName");
    }
  }

  ionViewDidLoad() {
    this.appController.fetchTableInRestaurant(this.restId).subscribe(data => {
      this.appController.mappingFirebaseFetchedData(this.tables, data, Table);
    })
  }

  functionButtonClick(button){
    if(button == FunctionButtonName.BUTTON_ADD){
      this.appController.pushPage("BaAddTablePage", {
        restId: this.restId,
        restName: this.restName
      })
    }    
  }



}
