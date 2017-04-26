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
private usuarioApagar: any;

f:any;

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
                    public database: AngularFireDatabase) 
  {
      
       this.usuarioApagar = navParams.get('usuarioApagar');
       this.User = this.database.object('/User/-KhUY7ugwy_VJqJXIDay'); // Cambiar en login
       this.trans = this.database.list('/Transacciones');
       this.saldo = this.database.list('/Saldo/-KhUY7ugwy_VJqJXIDay'); // Cambiar en login
       //this.f=this.saldo['Cuenta1'];



  }

  private pagar() {

  // Jota


 
    this.User.subscribe(
            snapshot => {

            (this.clavep) = snapshot.ClavePago; // Cambiar en login
            (this.cuenta) = snapshot.Cuentas.Cuenta1.Numero; // Cambiar en login
            (this.nombre) =snapshot.Nombre; // Cambiar en login
            (this.Userid) = snapshot.$key;    // Cambiar en login 


            if (this.clavep == this.clave)
            {
              if(this.saldo['Cuenta1'].saldo >= this.monto)
              {
                this.trans.push({
                        CuentaOrigen: this.cuenta,
                        Monto: '-'+this.monto,
                        CuentaDestino: this.usuarioApagar.Cuentas.Cuenta1.Numero
                        });
                
                this.saldo['Cuenta1'].update({
                  Numero: this.saldo['Cuenta1'].Numero,
                  Saldo: this.saldo['Cuenta1'].Saldo - this.monto
                });

                let confirmacion = this.alertController.create({
                    title: "Pago",
                    message: "Pago realizado exitosamente!",
                    buttons: [
                    {
                        text: "Listo",
                        handler: data => {
                      
                      
                        this.navCtrl.push(Tabs);
                        }
                    }]
                });

                confirmacion.present(confirmacion);
              }
            }
            else 
            {
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
