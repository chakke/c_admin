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
import { FirebaseServiceProvider } from '../providers/bistro-admin/firebase-service/firebase-service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyDMEZoEtmor-T166lP9bGCR9FxqQP4eGik",
  authDomain: "bistrodancerapp.firebaseapp.com",
  databaseURL: "https://bistrodancerapp.firebaseio.com",
  projectId: "bistrodancerapp",
  storageBucket: "bistrodancerapp.appspot.com",
  messagingSenderId: "773087969883"
};


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule
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
    StaffControllerProvider,
    FirebaseServiceProvider,
    AngularFireDatabase
  ]
})
export class AppModule { }
