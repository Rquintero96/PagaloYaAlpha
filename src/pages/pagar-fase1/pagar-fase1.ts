import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PagarFase2 } from "../pagar-fase2/pagar-fase2";
import { FirebaseObjectObservable, AngularFireDatabase } from "angularfire2";


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

  // Constructor
  constructor(public navCtrl: NavController, public navParams: NavParams, public database: AngularFireDatabase) {
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
    // Aqui guarda usuarioApagar como un contacto nuevo (Usar codigo de rocco)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagarFase1');
  }

}
