import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {QRCodeComponent} from 'angular2-qrcode';
import { FirebaseObjectObservable, AngularFireDatabase, AngularFire } from "angularfire2";

/**
 * Generated class for the Qrcode page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class Qrcode {
private usuarioActual:FirebaseObjectObservable<any>;
usuarioActual_id: string;
authObserver: any; 

  constructor(public navCtrl: NavController, public navParams: NavParams,  private  af: AngularFire) {
    this.authObserver = af.auth.subscribe( user => {
      if (user) 
      {
        this.usuarioActual_id = user.uid;
      } 
    });
     this.usuarioActual = this.af.database.object('/User/'+this.usuarioActual_id);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Qrcode');
  }

}
 
