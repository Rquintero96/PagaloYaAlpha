import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  AlertController } from 'ionic-angular';
import { PagarFase2 } from "../pagar-fase2/pagar-fase2";
import { FirebaseObjectObservable, AngularFireDatabase, FirebaseListObservable } from "angularfire2";


/**
 * Generated class for the PagarFase1 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pagar-fase1',
  templateUrl: 'pagar-fase1.html',
})
export class PagarFase1 {

  // Atributos
  private usuarioApagar: any;
  private Contactos: FirebaseListObservable<any>;

  // Constructor
  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase,  private alertController: AlertController) {
    this.usuarioApagar = navParams.get('usuarioApagar'); //Inicializa el usuario escaneado con la data pasada del home.ts
    
  }

  // Metodos
  
  private irPagarFase2()
  {
    this.guardarEnContactos();
    this.navCtrl.push(PagarFase2, { usuarioApagar: this.usuarioApagar });
  } 

  private guardarEnContactos()
  {

    this.Contactos = this.database.list('/Contactos/-KhUY7ugwy_VJqJXIDay'); // Cambiar en Login
     this.Contactos.push({
                  Nombre: this.usuarioApagar.Nombre,
                  Nickname: "",
                  Telefono: this.usuarioApagar.Telefono,
                  Cuentas:{Cuenta1: {Numero: this.usuarioApagar.Cuentas.Cuenta1.Numero, Banco: this.usuarioApagar.Cuentas.Cuenta2.Numero}},
                  Apellido: this.usuarioApagar.Apellido,
                  Correo: this.usuarioApagar.Correo
              }).catch((err: any) => {
                let error = this.alertController.create({
                  title: "Error",
                  message: "Presentamos un error al procesar el pago, por favor intentelo nuevamente. Verifique su conexión a internet por favor. ",
                  buttons: [
                  {
                    text: "Ok",
                    handler: data => {
                    console.log(' ');
                    }
                  }
                  ]
              });
                return ;
            });

    // Aqui guarda usuarioApagar como un contacto nuevo (Usar codigo de rocco)


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagarFase1');
  }

}
