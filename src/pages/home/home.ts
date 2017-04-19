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
  opbjetoApasar : any ;
  

//Constructor por defecto
  constructor( private platform: Platform, private barcode: BarcodeScanner, private navCtrl: NavController, private  af: AngularFire) {
    
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

                  this.usuarioApagar = this.af.database.object('/User/'+this.usuarioApagar_id);
                  this.usuarioApagar.subscribe(snapshot => {
                    //armamos el objeto a pasar
                    this.opbjetoApasar = {
                      Nombre: snapshot.Nombre,
                      Id: this.usuarioApagar_id,

                    }
                  
                } );

                  this.textoEscaneado = this.usuarioApagar_id; // Para probar solamente
          
                  this.irApago(this.opbjetoApasar);

                  
                }
            }, (error) => {
                console.log('error');

            });
        });

        
  }


  private irApago(opbjetoApasar)
  {
    this.navCtrl.push(PagarFase1, {usuarioApagar: this.opbjetoApasar} );
  }

  private irPerfil(){
    this.navCtrl.push(Perfil);
  }

  private irPagarFase2(){
    this.navCtrl.push(PagarFase2);
  }

}
