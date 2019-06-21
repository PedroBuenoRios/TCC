import { Storage } from '@ionic/storage';
import { UsersProvider } from './../../providers/users/users';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { ConteudoPage } from '../conteudo/conteudo';
import { CriacaoConteudoPage } from '../criacao-conteudo/criacao-conteudo';

@IonicPage()
@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html',
})
export class HistoricoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController) {
  }

  mostrar() {
    this.modalCtrl.create(ListaPage).present();
  }
}
@Component(
  {
    template: `
    <ion-header>
<ion-navbar>
  <ion-title>Sugestões</ion-title>
</ion-navbar>
</ion-header>

<ion-content padding>
  <ion-fab top right>
      <button ion-fab (click)="criarConteudo()"> 
        <ion-icon name="add"></ion-icon>
      </button>
    </ion-fab>
<ion-list>
    <ion-item id="{{item.id}}" *ngFor="let item of itens" tappable (click)="push(item.id)">
      {{item.titulo}} 
    </ion-item>
</ion-list>
</ion-content>
    `
  }
)
export class ListaPage {

  itens: any[];
  constructor(public plataform: Platform, public navParam: NavParams,
    public storage: Storage, public navCtrl: NavController, public http: UsersProvider) {
    this.storage.get('perfil').then((data) => {
      this.itens = data.eventosCriadas
    })
  }
  push(a) {
    console.log(a);
    this.http.query("sugestoes?id=" + a).
      subscribe((data) => {
        console.log(data);
        this.navCtrl.push(ConteudoPage, { evento: data[0] });
      });
  }
  
  criarConteudo(){
    this.navCtrl.push(CriacaoConteudoPage);
  }
}
