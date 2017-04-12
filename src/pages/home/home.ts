import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Plugin nativo de codigos de barra
import {BarcodeScanner} from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  click() 
  {
    BarcodeScanner.scan()
    .then((result) => {
      if (!result.cancelled) 
      {
        const barcodeData = new BarcodeData(result.text, result.format);
        this.scanDetails(barcodeData);

        // Quitar en Produccion:
        console.log("Scanned exitoso");
        console.log(barcodeData);
      }
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    })
  }

}
