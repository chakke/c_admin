import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ComponentsModule } from '../components/ba-components/components.module';
import { AppControllerProvider } from '../providers/bistro-admin/app-controller/app-controller';
import { BistroHttpServiceProvider } from '../providers/bistro-admin/bistro-admin-http-service/bistro-admin-http-service';
import { HttpService } from '../providers/http-service';
import { ProgressControllerProvider } from '../providers/bistro-admin/progress-controller/progress-controller';
import { RestaurantControllerProvider } from '../providers/bistro-admin/restaurant-controller/restaurant-controller';
import { ProvinceControllerProvider } from '../providers/bistro-admin/province-controller/province-controller';
import { StaffControllerProvider } from '../providers/bistro-admin/staff-controller/staff-controller';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppControllerProvider,
    BistroHttpServiceProvider,
    HttpService,
    ProgressControllerProvider,
    RestaurantControllerProvider,
    ProvinceControllerProvider,
    StaffControllerProvider
  ]
})
export class AppModule { }
