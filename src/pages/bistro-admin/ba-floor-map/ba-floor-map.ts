import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AppControllerProvider } from "../../../providers/bistro-admin/app-controller/app-controller";
import { Restaurant } from "../../../providers/bistro-admin/classes/restaurant";
import { Floor } from "../../../providers/bistro-admin/classes/floor";
import { Map } from "../../../providers/bistro-admin/classes/map";
import { FunctionButtonName, FIREBASE_CONST } from "../../../providers/bistro-admin/app-constant"

@IonicPage({ segment: 'ba-floor-map/:restId/:floorId' })
@Component({
  selector: 'page-ba-floor-map',
  templateUrl: 'ba-floor-map.html',
})
export class BaFloorMapPage {
  selectedRestaurant: Restaurant;
  selectedFloor: Floor;
  floors: Array<Floor> = [];
  maps: Array<Map> = [];
  restId = "bistro";
  floorId = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public appController: AppControllerProvider, public alertCtrl: AlertController) {
  }

  ionViewDidEnter() {
    let restId = this.navParams.get("restId");
    let floorId = this.navParams.get("floorId");
    //fixed data
    restId = "bistro";

    if (restId && floorId) {
      this.appController.fetchMapInRestaurant(restId).subscribe(data => {
        data.docChanges.forEach(change => {
          let mapData = change.doc.data();
          if (change.type == FIREBASE_CONST.DOCUMENT_CHANGE_TYPE.ADD) {
            let map = new Map(mapData.id, mapData.floor_id, mapData.title, [], 0, mapData.width, mapData.height);
            this.maps.push(map);
          }
          if (change.type == FIREBASE_CONST.DOCUMENT_CHANGE_TYPE.MODIFY) {
            let index = this.maps.findIndex(elm => {
              return elm.id == mapData.id;
            })
            if (index > -1) {
              this.maps[index].mappingFirebaseData(mapData);
            }
          }
          if (change.type == FIREBASE_CONST.DOCUMENT_CHANGE_TYPE.REMOVE) {
            let index = this.maps.findIndex(elm => {
              return elm.id == mapData.id;
            })
            if (index > -1) {
              this.maps.splice(index, 1);
            }
          }
        });
      })
      // this.appController.getRestauranById(restId).then(data => {
      //   this.selectedRestaurant = data;
      //   this.appController.getFloorsInRestaurant(restId).then(floors => {
      //     this.floors = floors;
      //     if (this.floors && this.floors.length > 0) { 
      //       let index = this.floors.findIndex(elm => {
      //         return elm.id == floorId;
      //       }); 
      //       if (index > -1) {
      //         this.selectedFloor = this.floors[index];
      //       } else {
      //         this.selectedFloor = this.floors[0];
      //       }
      //       this.getMaps();
      //     } else {
      //       this.appController.setRootPage("BaRestaurantPage");
      //     }
      //   }, floorsError => { 
      //   })
      // }, error => { 
      // })
    } else {
      this.appController.setRootPage("BaRestaurantPage");
    }
  }

  getMaps() {
    this.appController.getMapInFloor(this.selectedFloor.id).then(maps => {
      this.maps = maps;
    });
  }

  selectFloor(floor: Floor) {
    this.selectedFloor = floor;
  }

  edit(map: Map) {
    let alert = this.alertCtrl.create({
      title: "Chỉnh sửa sơ đồ",
      inputs: [{
        placeholder: "Tiêu đề",
        name: "name",
        value: map.title
      }],
      buttons: [
        {
          text: "Hủy",
          role: "cancel"
        }, {
          text: "OK",
          handler: (data) => {
            if (data && data.name) {
              map.title = data.name;
              this.appController.updateMap(this.restId, map.id, {
                title: map.title
              }).then(() => {
                console.log("update thành công");
              })
            }
          }
        }
      ]
    })
    alert.present();
  }

  delete(map: Map) {
    let alert = this.alertCtrl.create({
      message: "Bạn có chắc chắn muốn xóa sơ đồ: " + map.title,
      buttons: [
        {
          text: "Hủy",
          role: "cancel"
        }, {
          text: "OK",
          handler: () => {
            // let index = this.maps.findIndex(elm => {
            //   return elm.getId() == map.getId();
            // })
            // if (index > - 1) {
            //   this.maps.splice(index, 1);
            // }
            this.appController.deleteMaps(this.restId, map.id);
          }
        }
      ]
    })
    alert.present();
  }

  functionButtonClick(button: string) {
    if (button == FunctionButtonName.BUTTON_ADD) {
      let alert = this.alertCtrl.create({
        title: "Thêm mới sơ đồ",
        inputs: [{
          placeholder: "Tiều đề",
          type: "text",
          name: "name"
        }],
        buttons: [
          {
            text: "Hủy",
            role: "cancel"
          }, {
            text: "OK",
            handler: (data) => {
              if (data && data.name) {
                this.appController.addMapToRestaurant(this.restId, new Map("", this.floorId + "", data["name"], [], 0)).then(() => {
                  console.log("Thêm map thành công");
                });
              }
            }
          }
        ]
      })
      alert.present();
    }
  }

  gotoMapMaker(map: Map) {
    this.appController.pushPage("RestaurantMapMakerPage", {
      restId: this.restId,
      floorId: this.floorId,
      mapId: map.getId()
    });
  }
}
