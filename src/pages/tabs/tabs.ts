import { PerfilPage } from './../perfil/perfil';
import { EventoPage } from './../evento/evento';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { HomePage } from '../home/home';




@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  HomeRoot = HomePage;
  EventoRoot = EventoPage;
  PerfilRoot = PerfilPage; 

  constructor(public navCtrl: NavController) {}

}
