import { UsersProvider } from './../../providers/users/users';
import { CriacaoConteudoPage } from './../criacao-conteudo/criacao-conteudo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { ConteudoPage } from '../conteudo/conteudo';

@IonicPage()
@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html',
})
export class EventoPage {

  itens:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http:UsersProvider) {
      
  }
  push(a){
    console.log(a);
    this.http.query("sugestoes?id="+a).
    subscribe((data)=>{
      console.log(data);
      this.navCtrl.push(ConteudoPage,{evento:data[0]});
    });
    
   
  }
  criarConteudo(){
    this.navCtrl.push(CriacaoConteudoPage);
  }
  
  ionViewDidEnter(){
     this.http.query("sugestoes").subscribe((data) =>{
      this.itens = data;
    });

   }

}
