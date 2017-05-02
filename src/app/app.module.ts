import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler  } from 'ionic-angular';
import { AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
import { QRCodeModule } from 'angular2-qrcode';
// Paginas
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
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
// Dependencias nativas
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//Provedores
import { AuthData } from '../providers/auth-data';
// Plugin nativo de codigos de barra
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
// Constantantes y variables
export const firebaseConfig = {
    apiKey: "AIzaSyDFB1YfNGQZ77J7ZR4nnnfDhKk8kSyi8g8",
    authDomain: "pagaloya0.firebaseapp.com",
    databaseURL: "https://pagaloya0.firebaseio.com",
    projectId: "pagaloya0",
    storageBucket: "pagaloya0.appspot.com",
    messagingSenderId: "808320915241"
  };
export const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

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
    Qrcode,
    Login,
    Signup
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
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
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
    Qrcode,
    Login,
    Signup
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    BarcodeScanner
  ]
})
export class AppModule {}
