import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import {Platform} from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { PagarFase1 } from '../pagar-fase1/pagar-fase1';
import { PagarFase2 } from '../pagar-fase2/pagar-fase2';
import { Perfil } from '../perfil/perfil';

import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from "angularfire2";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Atributos
  private plt:Platform; 
  textoEscaneado: any;
  usuarioApagar_id : any;
  usuarioApagar: FirebaseObjectObservable<any>;
  opciones: BarcodeScannerOptions;
  obj : any ;
  obj2 : any ;

//Constructor por defecto
  constructor( private platform: Platform, private barcode: BarcodeScanner, private navCtrl: NavController, private  af: AngularFire) {
    this.usuarioApagar = this.af.database.object('/User/-KhUY7ugwy_VJqJXIDay');
    this.obj2 = this.usuarioApagar.subscribe(snapshot => {return snapshot} );
    this.plt = platform;
    this.textoEscaneado='hola';
  }

  // Funciones

  /*CargarHomePage() {
    this.eventId = this._navParams.get('eventId');
    this.eventTitle = this._navParams.get('eventTitle');

    this.buttonText = "Scan";
    this.loading = false;
  }*/

  public ScannearCodigo() // Boton de pagar
  {

        this.plt.ready().then(() => {
            this.barcode.scan().then((resultado) => {
                if (!resultado.cancelled) 
                {
                   this.usuarioApagar_id = resultado.text; // Buscar con este id


                  this.textoEscaneado = this.usuarioApagar_id;
          

                  this.navCtrl.push(PagarFase1);
                }
            }, (error) => {
                console.log('error');

            });
        });         

  }




  private irApago(resultado)
  {

          
        


  }

  private irPerfil(){
    this.navCtrl.push(Perfil);
  }

  private irPagarFase2(){
    this.navCtrl.push(PagarFase2);
  }

}
