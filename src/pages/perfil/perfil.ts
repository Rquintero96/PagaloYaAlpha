import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2';
// import * as QR from '../assets/scripts/qrcode';
import { Tabs } from '../tabs/tabs';


@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class Perfil {

  user: FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController, public alertController: AlertController, public navParams: NavParams, public database: AngularFireDatabase) {
      
       this.user = this.database.object('/User/-KhUY7ugwy_VJqJXIDay');// Lo de rey 
      
      //Lo que puede solucionarlo si almacenamos el id adentro de cada usuario
      /*const userQuery$ = this.database.list('/User', {
        query: {
        orderByChild: 'User',
        equalTo: '-KhUY7ugwy_VJqJXIDay',
        orderByKey: true,
      }
    });
    userQuery$.subscribe(User => console.log(User));*/ 
    // por que git jode tanto valeeee
  }

  goBack() {
    this.navCtrl.push(Tabs);
  }

  editInfo(user){
    console.log('Este es user: ' + user);
    let updateUserModal = this.alertController.create({
        title: "Actualizar Información",
        message: "Edita tu información",
        inputs: [
          {
            name: "Nombre",
            placeholder: "Nombre",
            value: user.Nombre
          },
          {
            name: "Apellido",
            placeholder: "Apellido",
            value: user.Apellido
          },
          {
            name: "Telefono",
            placeholder: "Telefono",
            value: user.Telefono
          },
          {
            name: "Correo",
            placeholder: "Correo",
            value: user.Correo
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
              this.user.update( {
                  Nombre: data.Nombre,
                  Telefono: data.Telefono,
                  Apellido: data.Apellido,
                  Correo: data.Correo
              });
            }
          }
        ]


    });
    updateUserModal.present(updateUserModal);
  }


}
