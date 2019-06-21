import { UsersProvider } from './../../providers/users/users';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController } from 'ionic-angular';
import { isRightSide } from 'ionic-angular/umd/util/util';

@IonicPage()
@Component({
  selector: 'page-tema',
  templateUrl: 'tema.html',
})
export class TemaPage {

  public items: any[];
  public itens : any[];
  
  public tema: string;
  options: { eventos: boolean, enquetes: boolean, discussoes: boolean };
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: UsersProvider,
    public modalCtrl: ModalController) {
      this.options = {
        eventos: true,
        enquetes: true,
        discussoes: true
      }
    this.itens = [];
    this.items = [];
    this.tema = this.navParams.get('tema');
   // this.getConteudos();
    
  }



  ionViewWillEnter() {
    this.concat();
  }
  selecionaTema(data) {
    if (data.tema == this.tema) {
      this.itens.push(data);
      this.items.push(data);
    }
  }

  filtrar() {
    let modal = this.modalCtrl.create(FiltrarPage);
    modal.present();
    modal.onDidDismiss(data => {
      this.options = data;
      this.concat();
      console.log(this.options);
    });
    console.log(this.options.eventos);

  }

  /*getConteudos(){
    this.http.query("").subscribe(
      data => {
        for (let d of data) {
          if (d != null) {
            this.selecionaTema(d);
          }
        }
      },
      error => {
        console.log(error);

      });
  }*/

  concat() {
    this.itens = [];
    if (this.options.eventos == true) {
      for (let item of this.items) {
        if (item.tipo == "Evento") {
          this.itens.push(item);
        }
      }
    }
    if (this.options.enquetes == true) {
      for (let item of this.items) {
        if (item.tipo == "Enquete") {
          this.itens.push(item);
        }
      }
    }
    if (this.options.discussoes == true) {
      for (let item of this.items) {
        if (item.tipo == "Discussão") {
          this.itens.push(item);
        }
      }
    }
    //if (this.itens.length > 0){
      //this.items = this.itens;
    //}
  }
}

@Component(
  {
    template: `
    <ion-content>
    <ion-grid>
    <ion-row>
      <ion-col>
        <ion-item>
          <ion-label>Eventos</ion-label>
          <ion-checkbox [(ngModel)]="eventos"></ion-checkbox>
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-item>
        <ion-label>Enquetes</ion-label>
        <ion-checkbox [(ngModel)]="enquetes"></ion-checkbox>
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-item>
        <ion-label>Discussões</ion-label>
        <ion-checkbox [(ngModel)]="discussoes"></ion-checkbox>
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <button ion-button (click)="filtrei()" color="primary" type="submit" class="btn-submit">Filtrar</button>
      </ion-col>
    </ion-row>
  </ion-grid>
    </ion-content>
    `
  }
)
export class FiltrarPage {

  public eventos: boolean;
  public enquetes: boolean;
  public discussoes: boolean;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.eventos = false;
    this.enquetes = false;
    this.discussoes = false;
  }
  filtrei() {

    let result = {
      eventos: this.eventos,
      enquetes: this.enquetes,
      discussoes: this.discussoes
    }

    if(!result.discussoes && !result.enquetes && !result.eventos){
      result = {
        eventos:true,
        enquetes:true,
        discussoes: true
      }
    }
    console.log(result.discussoes + "/" + result.enquetes + "/" + result.eventos);
    this.viewCtrl.dismiss(result);
  }
}
