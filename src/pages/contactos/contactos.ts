import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2';

@Component({
  selector: 'page-contactos',
  templateUrl: 'contactos.html',
})
export class Contactos {

  user: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, 
                public alertController: AlertController, 
                  public database: AngularFireDatabase) {
      
      this.user = this.database.list('/contacto');
  }

  createUser() {
    let newUserModal = this.alertController.create({
        title: "Nuevo Contacto",
        message: "Agrega un nuevo contacto",
        inputs: [
          {
            name: "Nombre",
            placeholder: "Nombre"
          },
          {
            name: "Apellido",
            placeholder: "Apellido"
          },
          {
            name: "Banco",
            placeholder: "Banco"
          },
          {
            name: "Cuenta",
            placeholder: "Cuenta Bancaria"
          },
          {
            name: "Correo",
            placeholder: "Correo"
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
              this.user.push({
                  Nombre: data.Nombre,
                  Banco: data.Banco,
                  Cuenta: data.Cuenta,
                  Apellido: data.Apellido,
                  Correo: data.Correo
              });
            }
          }
        ]


    });

    newUserModal.present(newUserModal);
  }

  removeUser(user) {
      let removeUserModal = this.alertController.create({
        title: "¿Seguro que desea eliminar el contacto?",
        buttons: [
          {
            text: "Cancelar",
            handler: data => {
              console.log('Canceló eliminar un Usuario');
            }
          },
          {
            text: "Eliminar",
            handler: data => {
              this.user.remove(user);
            }
          }
        ]
      });

      removeUserModal.present(removeUserModal);
  }

  updateUser(u) {
    let updateUserModal = this.alertController.create({
        title: "Actualizar Contacto",
        message: "Edita la información de " + u.Nombre,
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
            name: "Banco",
            placeholder: "Banco",
            value: u.Banco
          },
          {
            name: "Cuenta",
            placeholder: "Cuenta Bancaria",
            value: u.Cuenta
          },
          {
            name: "Correo",
            placeholder: "Correo",
            value: u.Correo
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
              this.user.update( u.$key, {
                  Nombre: data.Nombre,
                  Banco: data.Banco,
                  Cuenta: data.Cuenta,
                  Apellido: data.Apellido,
                  Correo: data.Correo
              });
            }
          }
        ]


    });

    updateUserModal.present(updateUserModal);
  }

  showUser(u) {

    let showUserModal = this.alertController.create({
        title: "Información de " + u.Nombre,
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
            name: "Banco",
            placeholder: "Banco",
            value: u.Banco
          },
          {
            name: "Cuenta",
            placeholder: "Cuenta Bancaria",
            value: u.Cuenta
          },
          {
            name: "Correo",
            placeholder: "Correo",
            value: u.Correo
          }
        ]

    });

    showUserModal.present(showUserModal);

  }

}
