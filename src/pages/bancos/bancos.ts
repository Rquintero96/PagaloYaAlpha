import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2';

@Component({
  selector: 'page-bancos',
  templateUrl: 'bancos.html',
})
export class Bancos {

  user: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertController: AlertController, public navParams: NavParams, public database: AngularFireDatabase) {
      
       this.user = this.user = this.database.list('/User', {
        query:{
          orderByKey: true,
          equalTo: '-KhUY7ugwy_VJqJXIDay'
        }
      });
  }
}
