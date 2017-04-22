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

  constructor(public navCtrl: NavController, public navParams: NavParams,  private  af: AngularFire) {
     this.usuarioActual = this.af.database.object('/User/-KhUY7ugwy_VJqJXIDay');
                  this.usuarioActual.subscribe(snapshot => {
                    this.usuarioActual_id = snapshot.$key;
                  
                } );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Qrcode');
  }

}
 
