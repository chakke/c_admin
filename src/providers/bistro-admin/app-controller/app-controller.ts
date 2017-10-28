import { Injectable } from '@angular/core';

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
  private menuItems = []

  constructor(
    private toastCtrl: ToastController,
    private app: App,
    private httpService: BistroHttpServiceProvider) {
    this.resourceLoader = new ResourceLoader();
    this.config = new Config();
    this.loadConfig().then(() => {

      this.menuItems = this.config.getData(["menu-items"]);
      console.log("menu items", this.menuItems);
      if (this.menuItemChangeHandler) {
        this.menuItemChangeHandler(this.menuItems);
      }
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
    if (page && page != "" && page) {
      let activeIndex = this.menuItems.findIndex(elm => {
        return elm.active;
      })
      console.log("active index ", activeIndex)
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




}
