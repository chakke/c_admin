import { Injectable } from '@angular/core';

import { Vendor } from '../classes/vendor';
import { User } from '../classes/user';
import { Province } from '../classes/province';

import { BistroHttpServiceProvider } from '../bistro-admin-http-service/bistro-admin-http-service';
import { ResourceLoader } from '../../resource-loader/resource-loader';
import { RestaurantControllerProvider } from '../restaurant-controller/restaurant-controller';
import { ProvinceControllerProvider } from '../province-controller/province-controller';
import { Restaurant } from '../classes/restaurant';

import { Config } from '../classes/config';
import { AssetsUrl } from '../app-constant';

import { Toast, ToastController, App } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Floor } from '../classes/floor';
import { Map } from '../classes/map';
@Injectable()
export class AppControllerProvider {

  private toast: Toast;
  private resourceLoader: ResourceLoader;
  private config: Config;
  private menuItemChangeHandler: any;
  private menuItems = [];

  private vendor: Vendor;
  private user: User;

  constructor(
    private toastCtrl: ToastController,
    private app: App,
    private httpService: BistroHttpServiceProvider,
    private restaurantController: RestaurantControllerProvider,
    private provinceController: ProvinceControllerProvider) {
    this.resourceLoader = new ResourceLoader();
    this.config = new Config();
    this.loadConfig().then(() => {

      this.menuItems = this.config.getData(["menu-items"]);
      if (this.menuItemChangeHandler) {
        this.menuItemChangeHandler(this.menuItems);
      }
      this.loadProvince();
      this.loadUser();
    });
  }

  loadConfig() {
    return new Promise((resolve, reject) => {
      if (this.config.hasData()) {
        resolve();
      } else {
        this.httpService.requestGet(AssetsUrl.CONFIG, "").then(
          data => {
            this.config.onResponseConfig(data);
            resolve();
          }
        );
      }
    });
  }

  getAppConfig() {
    return this.config;
  }

  getMenuItems() {
    return this.menuItems;
  }

  onMenuItemChange(handler) {
    this.menuItemChangeHandler = handler;
  }

  setRootPage(page: any, param?: any) {
    if (page && page != "") {
      let activeIndex = this.menuItems.findIndex(elm => {
        return elm.active;
      })
      if (activeIndex > -1) {
        if (this.menuItems[activeIndex].page == page) {
          return;
        } else {
          this.menuItems[activeIndex].active = false;
        }
      }
      this.app.getActiveNav().setRoot(page, param);
      for (let item of this.menuItems) {
        if (item.page == page) item.active = true;
      }

    }
  }

  pushPage(page: any, param?: any) {
    if (page && page != "") {
      this.app.getActiveNav().push(page, param);
      for (let item of this.menuItems) {
        item.active = false;
        if (item.page == page) item.active = true;
      }
    }
  }

  setActivePage(page: any) {
    if (page && page != "") {
      let activeIndex = this.menuItems.findIndex(elm => {
        return elm.active;
      })
      if (activeIndex > -1) {
        if (this.menuItems[activeIndex].page == page || this.menuItems[activeIndex].link == page) {
          return;
        } else {
          this.menuItems[activeIndex].active = false;
        }
      }
      for (let item of this.menuItems) {
        if (item.page == page || item.link == page) {
          item.active = true;
        }
      }
    } 
  }

  loadUser() {
    this.user = new User("B-Gate", "bgate@gmail.com", "0969696969", "69 Trần Duy Hưng, Cầu Giấy, Hà Nội", "123456");
    this.loadVendor();
  }

  getUser() {
    return this.user;
  }

  loadVendor() {
    this.vendor = new Vendor(1, this.user, "Dancer", "Dancer là chuỗi thương hiệu nhà hàng, quán cà phê sang trọng, đẳng cấp. Đến với Dancer bạn sẽ được trải nghiệm chất lượng phục vụ chuyên nghiệp cùng sản phẩm dịch vụ tuyệt vời.",
      "assets/bistro-admin/images/logo.png", "abc@example.com", "0969696969", "Khu dân cư số 10, Phan Đình Phùng, Tp. Thái Nguyên, Thái Nguyên");
    this.loadRestaurant();
  }

  getVendor() {
    return this.vendor;
  }

  loadRestaurant(city?: Province, keyword?: string) {
    this.httpService.getRestaurantByVendor(this.vendor.id, city ? city.id + '' : null, keyword ? keyword : null).then(data => {
      if (data && data.content)
        this.restaurantController.updateData(data.content, this.vendor, this.user);
    })
  }

  getRestauranById(id: number): Promise<Restaurant> {
    return new Promise((resolve, reject) => {
      this.httpService.getRestaurantDetail(id).then(data => {
        if (data && data.content) {
          resolve(this.restaurantController.getRestaurantFromData(data.content))
        }
        else {
          reject();
        }
      })
    })
  }

  getRestauranController() {
    return this.restaurantController;
  }

  getFloorsInRestaurant(restId: number): Promise<Array<Floor>> {
    return new Promise((resolve, reject) => {
      this.httpService.getFloorInRestaurant(restId).then(data => {
        let floors: Array<Floor> = []; 
        if (data && data.content) {
          data.content.forEach(element => {
            let floor = this.restaurantController.getFloorFromData(element);
            floors.push(floor);
          });
          resolve(floors);
        }
        else {
          reject();
        }
      })
    })
  }

  getMapInFloor(floorId: number): Promise<Array<Map>> {
    return new Promise((resolve, reject) => {
      this.httpService.getMapInFloor(floorId).then(data => {
        let maps: Array<Map> = []; 
        if (data && data.content) {
          data.content.forEach(element => {
            let map = this.restaurantController.getMapFromData(element);
            maps.push(map);
          });
          resolve(maps);
        }
        else {
          reject();
        }
      })
    })
  }

  getMapById(mapId: number): Promise<Map> {
    return new Promise((resolve, reject) => {
      this.httpService.getMapById(mapId).then(data => {
        if (data && data.content) { 
          resolve(this.restaurantController.getMapFromData(data.content));
        }
        else {
          reject();
        }
      })
    })
  }


  deleteFloor(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
    })
  }

  editFloor(id: number, name: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
    })
  }

  loadProvince() {
    this.httpService.getProvince().then(data => {
      if (data && data.content)
        this.provinceController.updateData(data.content);
    })
  }

  getProvincecontroller() {
    return this.provinceController;
  }
}
