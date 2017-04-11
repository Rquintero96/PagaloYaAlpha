import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { Bancos } from '../bancos/bancos';
import { Contactos } from '../contactos/contactos';
import { Transacciones } from '../transacciones/transacciones';


@Component({
  templateUrl: 'tabs.html'
})
export class Tabs {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = Transacciones;
  tab3Root: any = Bancos;
  tab4Root: any = Contactos;

  constructor() {

  }
}
