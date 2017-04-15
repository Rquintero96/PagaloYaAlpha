import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2';


@Component({
  selector: 'page-pagar-fase2',
  templateUrl: 'pagar-fase2.html',
})
export class PagarFase2 {

user: FirebaseObjectObservable<any>;
user2: FirebaseObjectObservable<any>;
clave:any;
monto:any;
clavep:any;


  constructor(public navCtrl: NavController, public alertController: AlertController, public navParams: NavParams, public database: AngularFireDatabase) {
      
       this.user = this.database.object('/User/-KhUxoaDXsMYe0x1-Ggf');
       this.user2 = this.database.object('/User/-KhUY7ugwy_VJqJXIDay');


  }

  pagar() {
    // Clave introducidad por el usuario. Esta clave se debe comparar con ClavePago de Firebase
      this.user.subscribe(
        snapshot => {
            (this.clavep) = snapshot.ClavePago;
            console.log(this.clavep);
            console.log("Clave: "+this.clave);
            console.log("Monto: "+this.monto);   
        },
        err => {
          console.log("Oops!");
        }
      );
    
     
  }

}
