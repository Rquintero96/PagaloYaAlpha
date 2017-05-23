import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase, AngularFire } from 'angularfire2';

@Component({
  selector: 'page-bancos',
  templateUrl: 'bancos.html',
})
export class Bancos {

  user: FirebaseListObservable<any>;
  authObserver: any;
  UsuarioActual_id: String;

  constructor(public navCtrl: NavController, public alertController: AlertController, public navParams: NavParams, public database: AngularFireDatabase, af: AngularFire) {
      
  this.authObserver = af.auth.subscribe( user => {
      if (user) 
      {
        this.UsuarioActual_id = user.uid;
      } 
    });

       this.user = this.database.list('/User', {
        query:{
          orderByKey: true,
          equalTo: this.UsuarioActual_id
        }
      });
  }
}
