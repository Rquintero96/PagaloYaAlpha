import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseObjectObservable, AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { Tabs } from '../tabs/tabs';


@Component({
  selector: 'page-pagar-fase2',
  templateUrl: 'pagar-fase2.html',
})
export class PagarFase2 {

  uDest: FirebaseObjectObservable<any>;
  User: FirebaseObjectObservable<any>;
  transO: FirebaseListObservable<any>;
  transD: FirebaseListObservable<any>;
  saldo: FirebaseObjectObservable<any>;
  saldo2: FirebaseObjectObservable<any>;
  trans: FirebaseObjectObservable<any>;
  private usuarioApagar: any;

  f: any;

  clave: any;
  monto: any;
  clavep: any;
  cuenta: any;
  cuentadest: any;
  nombre: any;
  Userid: any;
  userSaldo: any;
  montofinal: any;

  montoactual: any;
  montoactual2: any;


  constructor(public navCtrl: NavController,
    public alertController: AlertController,
    public navParams: NavParams,
    public database: AngularFireDatabase) {

    this.usuarioApagar = navParams.get('usuarioApagar');
    this.User = this.database.object('/User/-KhUY7ugwy_VJqJXIDay'); // Cambiar en login
    this.transO = this.database.list('/Transacciones/-KhUY7ugwy_VJqJXIDay');
    this.transD = this.database.list('/Transacciones/' + this.usuarioApagar.id);
    this.saldo = this.database.object('/Saldo/-KhUY7ugwy_VJqJXIDay/Cuenta1'); // Cambiar en login
    this.saldo2 = this.database.object('/Saldo/'+ this.usuarioApagar.id+'/Cuenta1'); 

    this.saldo.subscribe(snapshot => {
      this.montoactual = snapshot.Saldo;
    });
    this.saldo2.subscribe(snapshot => {
      this.montoactual2 = snapshot.Saldo;
    });


  }

  private pagar() {

    this.User.subscribe(
      snapshot => {

        (this.clavep) = snapshot.ClavePago; // Cambiar en login
        (this.cuenta) = snapshot.Cuentas.Cuenta1.Numero; // Cambiar en login
        (this.nombre) = snapshot.Nombre; // Cambiar en login
        (this.Userid) = snapshot.$key;    // Cambiar en login 


        if (this.clavep == this.clave) {
          //BEWARE, CHIGUIRE INCOMING


          if (this.montoactual >= this.monto) {

            this.transO.push({
              CuentaOrigen: this.cuenta,
              Monto: '-' + this.monto,
              CuentaDestino: this.usuarioApagar.Cuentas.Cuenta1.Numero,
            });

            this.transD.push({
              CuentaOrigen: this.cuenta,
              Monto: '+' + this.monto,
              CuentaDestino: this.usuarioApagar.Cuentas.Cuenta1.Numero,
            });
// Transferencia real
            let montoguardar = this.montoactual - this.monto;

            this.saldo.update({
              Saldo: montoguardar,
            });

             let montoguardar2: number = parseFloat(this.montoactual2)+parseFloat(this.monto);
             
              this.saldo2.update({
              Saldo: montoguardar2,
            });
// Transferencia real
            let confirmacion = this.alertController.create({
              title: "Pago",
              message: "Pago realizado exitosamente!",
              buttons: [
                {
                  text: "Listo",
                  handler: data => {
                    this.navCtrl.popToRoot();
                  }
                }]
            });

            confirmacion.present(confirmacion);

          } else {
            let mensaje = this.alertController.create({
              title: "Saldo Insuficiente",
              message: "Usted no posee saldo suficiente para esta transaccion!",
              buttons: [
                {
                  text: "Ok",
                  handler: data => {
                    console.log(' ');
                  }
                }]
            });
            mensaje.present(mensaje);
          }
          //End of CHIGUIRE


        }
        else {
          let negacion = this.alertController.create({
            title: "Pago",
            message: "La clave secreta no es correcta, vuelve a introducirla por favor!",
            buttons: [
              {
                text: "Ok",
                handler: data => {
                  console.log(' ');
                }
              }
            ]
          });

          negacion.present(negacion);
        }
      });



  }
}
