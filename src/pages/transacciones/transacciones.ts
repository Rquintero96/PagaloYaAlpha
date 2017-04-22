import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2';

@Component({
  selector: 'page-transacciones',
  templateUrl: 'transacciones.html',
})

export class Transacciones {

  user: FirebaseListObservable<any>;
  uDest: FirebaseObjectObservable<any>;
  key: any;

  constructor(public navCtrl: NavController, public alertController: AlertController, public navParams: NavParams, public database: AngularFireDatabase) {
     
       this.user = this.database.list('/Transacciones/-KhUY7ugwy_VJqJXIDay');

  }

  showTransac(u) {

    let showTransacModal = this.alertController.create({
        title: "Información de la Transacción",
        inputs: [
          {
            name: "CuentaDestino",
            placeholder: "Cuenta Destino",
            value: u.CuentaDestino
          },
          {
            name: "CuentaOrigen",
            placeholder: "Cuenta Origen",
            value: u.CuentaOrigen
          },
          {
            name: "Monto",
            placeholder: "Monto",
            value: u.Monto
          }
        ],
        buttons: [
           {
            text: "Atrás",
            handler: data => {
              console.log('Atrás');
            }
          }
        ]

    });

    showTransacModal.present(showTransacModal);

  }


}

