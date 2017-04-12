import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler  } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Bancos } from '../pages/bancos/bancos';
import { Contactos } from '../pages/contactos/contactos';
import { Transacciones } from '../pages/transacciones/transacciones';
import { Tabs } from '../pages/tabs/tabs';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

<<<<<<< HEAD
// Plugin nativo de codigos de barra
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
=======
export const firebaseConfig = {
    apiKey: "AIzaSyDFB1YfNGQZ77J7ZR4nnnfDhKk8kSyi8g8",
    authDomain: "pagaloya0.firebaseapp.com",
    databaseURL: "https://pagaloya0.firebaseio.com",
    projectId: "pagaloya0",
    storageBucket: "pagaloya0.appspot.com",
    messagingSenderId: "808320915241"
  };
>>>>>>> aba2149caff77de8ed32634d8cdbb54cfb93330a

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Bancos,
    Contactos,
    Transacciones,
    Tabs
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Bancos,
    Contactos,
    Transacciones,
    Tabs
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner
  ]
})
export class AppModule {}
