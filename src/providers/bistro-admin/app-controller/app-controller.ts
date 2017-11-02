import { Injectable } from '@angular/core';

import { Vendor } from '../classes/vendor';
import { User } from '../classes/user';

import { BistroHttpServiceProvider } from '../bistro-admin-http-service/bistro-admin-http-service';
import { ResourceLoader } from '../../resource-loader/resource-loader';
import { Config } from '../classes/config';
import { AssetsUrl } from '../app-constant';

import { Toast, ToastController, App } from 'ionic-angular';
import 'rxjs/add/operator/map';
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
    private httpService: BistroHttpServiceProvider) {
    this.resourceLoader = new ResourceLoader();
    this.config = new Config();
    this.loadConfig().then(() => {

      this.menuItems = this.config.getData(["menu-items"]);
      if (this.menuItemChangeHandler) {
        this.menuItemChangeHandler(this.menuItems);
      }
      this.loadUser();
      this.loadVendor();
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
    console.log("set active page", page, this.menuItems);
  }

  loadUser() {
    this.user = new User("Ngọc Truynh", "Truynhcv@gmail.com", "0969696969", "69 Trần Duy Hưng, Cầu Giấy, Hà Nội", "123456");
  }

  getUser() {
    return this.user;
  }

  loadVendor() {
    this.vendor = new Vendor(this.user, "Dancer", "Dancer là chuỗi thương hiệu nhà hàng, quán cà phê sang trọng, đẳng cấp. Đến với Dancer bạn sẽ được trải nghiệm chất lượng phục vụ chuyên nghiệp cùng sản phẩm dịch vụ tuyệt vời.",
      "assets/bistro-admin/images/logo.png", "abc@example.com", "0969696969", "Khu dân cư số 10, Phan Đình Phùng, Tp. Thái Nguyên, Thái Nguyên")
  }

  getVendor() {
    return this.vendor;
  }
}
