import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Plugin nativo de codigos de barra
import {BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Atributos
  public textoEscaneado: string;
  opciones: BarcodeScannerOptions;
  resultado: {};

//Constructor por defecto
  constructor( private barcode: BarcodeScanner, public navCtrl: NavController) {

  }

  // Funciones

  /*CargarHomePage() {
    this.eventId = this._navParams.get('eventId');
    this.eventTitle = this._navParams.get('eventTitle');

    this.buttonText = "Scan";
    this.loading = false;
  }*/

  public ScannearCodigo() 
  {

  this.opciones = {
    prompt: 'Escanea un codigo para pagar'
  }

  this.barcode.scan()
  .then((resultado) => {
      if (!resultado.cancelled) 
      {
        this.irApago(resultado);
        // Quitar en Produccion:
        console.log("Scan exitoso");
        console.log(resultado.text);
      }
    })
  .catch((err) => {
      console.log(err);
      alert(err);
    })
  }

  private irApago(barcodeData) 
  {
    /*NavController.push(pagarFase1, {
      scannedText: resultado.text
    });*/
  }

}
