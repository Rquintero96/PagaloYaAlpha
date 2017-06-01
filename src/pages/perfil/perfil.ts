import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase, AngularFire } from 'angularfire2';
// import * as QR from '../assets/scripts/qrcode';
import { Tabs } from '../tabs/tabs';
import { Qrcode } from '../qrcode/qrcode';


@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class Perfil {

  user: FirebaseListObservable<any>;

  usuarioActual_id: string;
  authObserver: any;

  constructor(public navCtrl: NavController, public alertController: AlertController, 
  public navParams: NavParams, public database: AngularFireDatabase, private  af: AngularFire) 
  {
       this.authObserver = af.auth.subscribe( user => {
      if (user) 
      {
        this.usuarioActual_id = user.uid;
      } 
    });
       // Lo de rey 
       this.user = this.database.list('/User', { 
        query:{
          orderByKey: true,
          equalTo: this.usuarioActual_id
        }
      });
      
      
  }

  goBack() {
    this.navCtrl.push(Tabs);
  }

  editInfo(u){
    console.log('Este es user: ' + u.Nombre);
    let updateUserModal = this.alertController.create({
        title: "Actualizar Información",
        message: "Edita tu información",
        inputs: [
          {
            name: "Nombre",
            placeholder: "Nombre",
            value: u.Nombre
          },
          {
            name: "Apellido",
            placeholder: "Apellido",
            value: u.Apellido
          },
          {
            name: "Telefono",
            placeholder: "Telefono",
            value: u.Telefono
          },
          {
            name: "Correo",
            placeholder: "Correo",
            value: u.Correo
          },
          {
            name: "BancoPrincipal",
            placeholder:"Banco Principal",
            value: u.Cuentas.Cuenta1.Banco
          },
          {
            name: "CuentaPrincipal",
            placeholder:"Cuenta Principal",
            value: u.Cuentas.Cuenta1.Numero
          },
          {
            name: "BancoSecundario",
            placeholder:"Banco Secundario",
            value: u.Cuentas.Cuenta2.Banco
          },
          {
            name: "CuentaSecundaria",
            placeholder:"Cuenta Secundaria",
            value: u.Cuentas.Cuenta2.Numero
          }
        ],
        buttons: [
          {
            text: "Cancelar",
            handler: data => {
              console.log('Canceló el ingreso de un nuevo Usuario');
            }
          },
          {
            text: "Guardar",
            handler: data => {
              this.user.update( u.$key,{
                  Nombre: data.Nombre,
                  Telefono: data.Telefono,
                  Apellido: data.Apellido,
                  Correo: data.Correo,
                  Cuentas:{Cuenta1: {Numero: data.CuentaPrincipal, Banco: data.BancoPrincipal}, 
                           Cuenta2: {Numero:data.CuentaSecundaria, Banco: data.BancoSecundario}},
              }); 
            }
          }
        ]


    });
    updateUserModal.present(updateUserModal);
  }

  private MostrarCodigo()
  {
    this.navCtrl.push(Qrcode);
  }


}
