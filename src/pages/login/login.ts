import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,  AlertController } from 'ionic-angular';
import { AuthProviders, AuthMethods, AngularFire } from 'angularfire2';
import { AuthData } from '../../providers/auth-data';
import { HomePage } from '../home/home';
import { Tabs } from '../tabs/tabs';
import { Signup} from '../signup/signup';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  // Atributos
  email: any;
  password: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private angfire: AngularFire,
  public nav: NavController, public authData: AuthData, public alertCtrl: AlertController) 
  {

  }

// Metodos

CrearCuenta(){
    this.nav.push(Signup);
}

 login() {
    this.authData.loginUser(this.email, 
        this.password).then( authData => {
          this.nav.setRoot(Tabs);
    }, error => {
      let alert = this.alertCtrl.create({
        message: error.message,
        buttons: [
        {
          text: "Ok",
          role: 'cancel'
        }
        ]
  });
    alert.present();
    });
}






  // Metodos Piedreros
  private loginPiedreroDePrueba() { 
    this.angfire.auth.login({
      email: this.email,
      password: this.password
    },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password  
      }).then((response) => {
        console.log('Exito' + JSON.stringify(response));
        let currentuser = {
          email: response.auth.email,
          picture: response.auth.photoURL
        };
        window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
        this.navCtrl.pop();
      }).catch((error) => {
        console.log(error);
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

// Implementar mismo metodo con google
private loginGoogle() { }



}
