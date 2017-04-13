import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2';


@Component({
  selector: 'page-pagar-fase2',
  templateUrl: 'pagar-fase2.html',
})
export class PagarFase2 {

user: FirebaseObjectObservable<any>;
user2: FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController, public alertController: AlertController, public navParams: NavParams, public database: AngularFireDatabase) {
      
       this.user = this.database.object('/User/-KhUxoaDXsMYe0x1-Ggf');
       this.user2 = this.database.object('/User/-KhUY7ugwy_VJqJXIDay');
      
  }

  pagar() {
    
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PagarFase2');
  }

}
