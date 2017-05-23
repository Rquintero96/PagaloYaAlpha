import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  AlertController } from 'ionic-angular';
import { PagarFase2 } from "../pagar-fase2/pagar-fase2";
import { FirebaseObjectObservable, AngularFireDatabase, FirebaseListObservable, AngularFire } from "angularfire2";


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
  private Contactos: FirebaseObjectObservable<any>;
  private avatar: string;
  private authObserver: any;
  UsuarioActual_id: string;
  // Constructor
  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase,  private alertController: AlertController, private  af: AngularFire) {
    this.usuarioApagar = navParams.get('usuarioApagar'); //Inicializa el usuario escaneado con la data pasada del home.ts
    this.avatar = this.usuarioApagar.Nombre.charAt(0) + "" + this.usuarioApagar.Apellido.charAt(0);
    
    this.authObserver = af.auth.subscribe( user => {
      if (user) 
      {
        this.UsuarioActual_id = user.uid;
      } 
    });
  }

  // Metodos
  
  private irPagarFase2()
  {
    this.guardarEnContactos();
    this.navCtrl.push(PagarFase2, { usuarioApagar: this.usuarioApagar });
  } 

  private guardarEnContactos()
  {
    let ContactoAguardar = {
                  Nombre: this.usuarioApagar.Nombre,
                  Nickname: this.usuarioApagar.Nombre,
                  Telefono: this.usuarioApagar.Telefono,
                  Cuentas:{Cuenta1: {Numero: this.usuarioApagar.Cuentas.Cuenta1.Numero, Banco: this.usuarioApagar.Cuentas.Cuenta2.Numero}},
                  Apellido: this.usuarioApagar.Apellido,
                  Correo: this.usuarioApagar.Correo
                }
    this.Contactos = this.database.object(`/Contactos/${this.UsuarioActual_id}/${this.usuarioApagar.id}`); // Cambiar en Login
    this.Contactos.set(ContactoAguardar).catch((err: any) => {
                let error = this.alertController.create({
                  title: "Error",
                  message: "Presentamos un error al procesar el pago, por favor intentelo nuevamente. Verifique su conexión a internet por favor. ",
                  buttons: [
                  {
                    text: "Ok",
                    handler: data => {
                    }
                  }
                  ]
              });

            });

    // Aqui guarda usuarioApagar como un contacto nuevo (Usar codigo de rocco)


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagarFase1');
  }

}
