import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2';
import { PagarFase2 } from '../pagar-fase2/pagar-fase2';

@Component({
  selector: 'page-contactos',
  templateUrl: 'contactos.html',
})
export class Contactos {

  user: FirebaseListObservable<any>;
  usuarioApagar: FirebaseObjectObservable<any>;
  authObserver: any;
  UsuarioActual_id: String;


  constructor(public navCtrl: NavController, 
                public alertController: AlertController, 
                  public database: AngularFireDatabase, private  af: AngularFire) {
      
  this.authObserver = af.auth.subscribe( user => {
      if (user) 
      {
        this.UsuarioActual_id = user.uid;
      } 
    });

      this.user = this.database.list('/Contactos/'+this.UsuarioActual_id);
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
            name: "Nickname",
            placeholder: "Nickname"
          },
          {
            name: "Telefono",
            placeholder: "Telefono"
          },
          {
            name: "BancoPrincipal",
            placeholder:"Banco Principal"    
          },
          {
            name: "CuentaPrincipal",
            placeholder:"Cuenta Principal"
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
                  Nickname: data.Nickname,
                  Telefono: data.Telefono,
                  Cuentas:{Cuenta1: {Numero: data.CuentaPrincipal, Banco: data.BancoPrincipal}},
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
              this.user.update( u.$key, {
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
            value: u.Cuentas.Cuenta1.Banco
          },
          {
            name: "Cuenta",
            placeholder: "Cuenta Bancaria",
            value: u.Cuentas.Cuenta1.Numero
          },
          {
            name: "Correo",
            placeholder: "Correo",
            value: u.Correo
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

    showUserModal.present(showUserModal);

  }

  private irPagarFase2(u){
    this.navCtrl.push(PagarFase2);
  }

}
