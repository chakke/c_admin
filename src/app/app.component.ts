import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppControllerProvider } from '../providers/bistro-admin/app-controller/app-controller';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = "BaLoadingPage";
  menuItems = [];
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private appController: AppControllerProvider) {
    this.appController.onMenuItemChange((data) => {
      this.menuItems = data;
      console.log("this.menuItems", this.menuItems);
    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });
  }

  ngAfterViewInit() {
    this.menuItems = this.appController.getMenuItems();

  }
}

