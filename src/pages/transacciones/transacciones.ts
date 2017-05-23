import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase, AngularFire } from 'angularfire2';

@Component({
  selector: 'page-transacciones',
  templateUrl: 'transacciones.html',
})

export class Transacciones {

  user: FirebaseListObservable<any>;
  authObserver: any;
  UsuarioActual_id: String; 


  constructor(public navCtrl: NavController, public alertController: AlertController, public navParams: NavParams, public database: AngularFireDatabase, public af: AngularFire) {

      this.authObserver = af.auth.subscribe( user => {
        if (user) 
        {
          this.UsuarioActual_id = user.uid;
        } 
      });
       this.user = this.database.list('/Transacciones/'+this.UsuarioActual_id);
      
  }

  showTransac(u) {

    let showTransacModal = this.alertController.create({
        title: "Información de la Transacción",
        message: "Cuenta Destino, Cuenta Origen, Monto",
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

