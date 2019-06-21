import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, IonicPage, NavController, ToastController, ViewController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { UsersProvider } from './../../providers/users/users';
import { CadastroPage } from './../cadastro/cadastro';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public httpUser: UsersProvider,
    public storage: Storage,
    ) {
  }

  ionViewDidLoad(){
    this.storage.get('perfil').
    then((data) =>{
      if(data != null){
        console.log(data);
        this.navCtrl.setRoot(TabsPage);
      }
    })
  }
  goCadastro() {
    this.navCtrl.push(CadastroPage);
  }

  logar(){
    let senha: string = '';
     let alert = this.alertCtrl.create({
       mode: 'ios',
       title:'Login',
       inputs:[
         {
           type:'email',
           name:'email',
           placeholder:'Email',
           id:'email',
           value: this.email
         },
         {
          type:'password',
          name:'senha',
          placeholder:'Senha',
          id:'senha'
        }
       ],
       buttons:[
         {
           text:'Entrar',
           handler: data=>{
             console.log(data);
             return data;
           }
         }
       ]
     });
     alert.present();
     //O método onDidDismiss é usado para que quando o alert for fechado
     //seja realizada a verificação do login
     alert.onDidDismiss(data=>{
      console.log(data);
        this.email=data.email;
       this.httpUser.logar(this.email, data.senha)
      //Significa que existe o usuário e ele entrará na sessão
      .then(data => {
        this.storage.set('perfil',data);
          console.log(data);
            this.Toast('Pronto você está Logado!!',1500,'middle');
          this.navCtrl.setRoot(TabsPage);
        })//Significa que não econtrou o usuário e entrará na exceção
      .catch(error => {
        this.Toast('Acesso Negado: Usuário e/ou senha Invaíldos', 1500,'middle')
      });
    });
  }

  Toast(message, duration, position){
    this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    }).present();
  }
}
