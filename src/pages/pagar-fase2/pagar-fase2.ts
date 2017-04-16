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
trans: FirebaseListObservable<any>;
saldo: FirebaseListObservable<any>;
clave:any;
monto:any;
clavep:any;
cuenta:any;
cuentadest:any;
nombre:any;
Userid:any;
userSaldo:any;
montofinal:any;

  constructor(public navCtrl: NavController, 
                public alertController: AlertController, 
                  public navParams: NavParams, 
                    public database: AngularFireDatabase) {
      
       this.uDest = this.database.object('/User/-KhUxoaDXsMYe0x1-Ggf');
       this.User = this.database.object('/User/-KhUY7ugwy_VJqJXIDay');
       this.trans = this.database.list('/Transacciones');
       this.saldo = this.database.list('/Saldo/-KhUY7ugwy_VJqJXIDay');



  }

  pagar() {
      this.uDest.subscribe (
        snapshot1 => {

          (this.cuentadest) = snapshot1.Cuentas.Cuenta2.Numero;

          this.User.subscribe(
            snapshot => {

            (this.clavep) = snapshot.ClavePago;
            (this.cuenta) = snapshot.Cuentas.Cuenta1.Numero;
            (this.nombre) =snapshot.Nombre;
            (this.Userid) = snapshot.$key;

            console.log("Cuenta de "+this.nombre+": "+this.cuenta);
            console.log("Clave de "+this.nombre+": "+this.clavep);
            console.log("Clave escrita: "+this.clave);
            console.log("Monto escrito: "+this.monto);
            console.log("Cuenta destino: "+this.cuentadest);
            console.log("ID Origen: "+this.Userid);

             

            if (this.clavep == this.clave){
             let confirmacion = this.alertController.create({
                  title: "Pago",
                  message: "Pago realizado exitosamente!",
                  buttons: [
                  {
                      text: "Listo",
                      handler: data => {
                      this.trans.push({
                      CuentaOrigen: this.cuenta,
                      Monto: this.monto,
                      CuentaDestino: this.cuentadest
                      });
                    
                      // Esta funcion de aqui me dice que no se puede obtener Saldo porque es 
                      // Undefined, pero que yo sepa no es Undefined asi que no entiendo ):

                      /* this.saldo.subscribe(
                          snapshot2 => {
                            (this.userSaldo) = snapshot2.Cuenta1.Saldo;
                            console.log(this.userSaldo);
                            if (this.userSaldo >= this.monto) {
                                this.montofinal = this.userSaldo - this.monto;
                                console.log(this.montofinal);
                                this.saldo.push({
                                Cuenta1: {Numero: this.cuenta}              
                                });
                            }
                            
                          }
                      ); */
                      
                      this.navCtrl.push(Tabs);
                      }
                  }
                  ]
              });

              confirmacion.present(confirmacion);
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
        },
        err => {
          console.log("Oops!");
        }
      );
        },
        err => {
          console.log("Oops!");
        }
      );
  }

}
