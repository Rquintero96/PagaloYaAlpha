import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PagarFase1 } from '../pagar-fase1/pagar-fase1';
import { PagarFase2 } from '../pagar-fase2/pagar-fase2';
import { Perfil } from '../perfil/perfil';

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

  public ScannearCodigo() // Boton de pagar
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

  private irApago(resultado)
  {
    if (resultado)
    {
          let usuarioApagar_id : String = resultado.text; // Buscar con este id
          let usuarioApagar; // <----- Guardar el Usuarios acá luego
          /*
          Aqui va el fetch a fire base con el id del usuario
          */
    
          this.navCtrl.push(PagarFase1, {
          usuarioApagar: usuarioApagar, 
          qr: resultado
          });
    }

  }

  private irPerfil(){
    this.navCtrl.push(Perfil);
  }

  private irPagarFase2(){
    this.navCtrl.push(PagarFase2);
  }

}
