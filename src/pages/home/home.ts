import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import {Platform} from 'ionic-angular';
import { NavController, AlertController } from 'ionic-angular';
import { PagarFase1 } from '../pagar-fase1/pagar-fase1';
import { PagarFase2 } from '../pagar-fase2/pagar-fase2';
import { Perfil } from '../perfil/perfil';
import { Qrcode } from '../qrcode/qrcode';


import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, AngularFireDatabase } from "angularfire2";

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
  objetoApasar: any;
  transacciones: FirebaseListObservable<any>;

  opcionesDeScan: BarcodeScannerOptions;


  user: FirebaseListObservable<any>;

  

//Constructor por defecto
  constructor( private platform: Platform, private barcode: BarcodeScanner, 
  private navCtrl: NavController, private  af: AngularFire, 
  public database: AngularFireDatabase, private alertController: AlertController) 
  {
    
    this.plt = platform;
    this.transacciones = this.database.list('/Transacciones/-KhUY7ugwy_VJqJXIDay', { 
        query:{
          limitToLast: 5, 
        }
      });


      this.opcionesDeScan = {
        prompt:'Escanea un codigo para pagar'
      }

    
    this.user = this.database.list('/User', { 
        query:{
          orderByKey: true,
          equalTo: '-KhUY7ugwy_VJqJXIDay'
        }
      });
    
  }



  // Funciones

  public ScannearCodigo() // Boton de pagar
  {

        this.plt.ready().then(() => {
            this.barcode.scan(this.opcionesDeScan).then((resultado) => {
                if (!resultado.cancelled) 
                {
                  this.usuarioApagar_id = resultado.text; // Buscar con este id

                  this.usuarioApagar = this.af.database.object('/User/'+this.usuarioApagar_id);
                  this.usuarioApagar.subscribe(snapshot => {
                    //armamos el objeto a pasar
                    this.objetoApasar = snapshot;
                    this.objetoApasar.id = snapshot.$key;
                    this.navCtrl.push( PagarFase1, {usuarioApagar: this.objetoApasar} );
                } );
                                           
                }
            }, (error) => {
                  let VentanaError = this.alertController.create({
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

                console.log('PC: error');

            });
        });

        
  }

  private MostrarCodigo()
  {
    this.navCtrl.push(Qrcode);
  }

  private irApago(objetoApasar)
  {
    this.navCtrl.push( PagarFase1, {usuarioApagar: objetoApasar} );
  }

  private irPerfil(){
    this.navCtrl.push(Perfil);
  }

  private irPagarFase2(){
    this.navCtrl.push(PagarFase2);
  }

}
