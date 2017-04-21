import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler  } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { QRCodeModule } from 'angular2-qrcode';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Bancos } from '../pages/bancos/bancos';
import { Contactos } from '../pages/contactos/contactos';
import { Transacciones } from '../pages/transacciones/transacciones';
import { Tabs } from '../pages/tabs/tabs';
import { PagarFase1 } from '../pages/pagar-fase1/pagar-fase1';
import { PagarFase2 } from '../pages/pagar-fase2/pagar-fase2';
import { Perfil } from '../pages/perfil/perfil';
import { Qrcode } from '../pages/qrcode/qrcode';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


// Plugin nativo de codigos de barra
import {BarcodeScanner} from '@ionic-native/barcode-scanner';

export const firebaseConfig = {
    apiKey: "AIzaSyDFB1YfNGQZ77J7ZR4nnnfDhKk8kSyi8g8",
    authDomain: "pagaloya0.firebaseapp.com",
    databaseURL: "https://pagaloya0.firebaseio.com",
    projectId: "pagaloya0",
    storageBucket: "pagaloya0.appspot.com",
    messagingSenderId: "808320915241"
  };


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Bancos,
    Contactos,
    Transacciones,
    Tabs,
    PagarFase1,
    PagarFase2,
    Perfil,
    Qrcode
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Atrás',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition'
    }),
    QRCodeModule,
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
    Tabs,
    PagarFase1,
    PagarFase2,
    Perfil,
    Qrcode
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner
  ]
})
export class AppModule {}
