import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFire } from 'angularfire2';
// Paginas
import { Tabs } from '../pages/tabs/tabs';
import { Perfil } from '../pages/perfil/perfil';
import { Login } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  //Atributos
  @ViewChild(Nav) nav: Nav;
  rootPage:any ;
  pages: Array<{title: string, component: any}>;

  // Constructor
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public af: AngularFire) 
  {


    const authObserver = af.auth.subscribe( user => {
      if (user) {
        this.rootPage = Tabs;
        authObserver.unsubscribe();
      } else {
        this.rootPage = Login;
        authObserver.unsubscribe();
      }
    });



    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

     this.pages = [
      { title: 'Perfil', component: Perfil  }
      // Aqui van las otras paginas
    ];

  }
  // Funciones 
   openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

