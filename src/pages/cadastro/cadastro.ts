import { Component, ViewChild } from '@angular/core';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
//import { Oauth, OauthCordova, Facebook } from 'ionic-cordova-oauth'
//import { File, FileOriginal } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, TextInput, ToastController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { TabsPage } from './../tabs/tabs';



@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  @ViewChild('email') txtEmail: TextInput;
  usuario: any;
  nome: string;
  email: string;
  senha: string;
  csenha: string;
  isEmailInvalido: boolean;
  //foto: FileOriginal;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpUser: UsersProvider,
    public toastCtrl: ToastController,
    public storage: Storage
  ) {
    this.isEmailInvalido = false;
  }

  cadastrar() {
    /*let options:FileUploadOptions = {
      fileKey: 'file',
      fileName: 'asa.jpg',
      headers: {}
     }
     let obj = new FileTransferObject();
     console.log(this.foto.dataDirectory);
     obj = this.fileTransfer.create();
     obj.upload(this.foto.dataDirectory, 'C:\Users\cliente pc\Documents\Upload', options)
   .then((data) => {
     console.log(data);
   }, (err) => {
    console.log(err);
   });*/

   //Verifica a se o email é valido ou não, e se as senha são compatíveis
   if(this.isEmailInvalido || this.senha != this.csenha){
     this.Toast('Você deve ter inserido alguma dado errado por favor tente novamente',2000,'middle')
   }
   //Verifica se os campos de textos estão vazios ou se so contem espaço
   else if((this.email == null) || (this.senha == null) || (this.nome == null) || (this.csenha == null)){
    this.Toast('Por favor preencha todos os campos antes de terminar o cadastro',1500,'middle')
  }
  //Todos os campos estão corretos
   else{
   this.usuario = {
     nome: this.nome,
     email: this.email,
     senha: this.senha,
     dirFoto:'',
     eventosSugeridos_ID:[],
     eventosAvaliados_ID:[],
     comentarios_ID:[],
     isLogado: true
   }
    this.httpUser.cadastrar(this.usuario).subscribe(
      //Deu tudo certo
      (data) => {
        console.log(data);
        this.storage.set('perfil', this.usuario)
        //Foi criada com sucesso e mostra um toast exibindo um menssagem de confirmação
        .then(resolve=>{
          this.Toast('Sua Conta foi criada com sucesso',1500,'middle')
          this.navCtrl.setRoot(TabsPage);
        })
        //Parece que houve alguma erro na hora de cadastrar o usuário no storage
        .catch(reject =>{
            this.Toast('Oops Parece que aconteceu algum erro por favor tente novamente',1500,'middle');
          console.log(reject);
        });
      },
       //Parece que houve alguma erro na hora de cadastrar o usuário no banco de dados
      (error) => {
          this.Toast('Oops Parece que aconteceu algum erro por favor tente novamente',1500,'middle');
        console.log(error);
      });
    }
  }

  //So criei o método pra não ter que ficar digitando muito
  Toast(message, duration, position){
    this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    }).present();
  }

  //Verifica se o Email digitado é válido ou não
  isEmailValido(){
    this.httpUser.getByEmail(this.email)
    .then(data => {
    console.log('ok');
    //O método .search() retorna o -1 caso não econtre a string ou expressão 
    //indicada, logo se ele for diferente de -1 significa que contem o @
    //e o email é válido
    if(this.email.search('@') != -1)
    this.isEmailInvalido = false;
    //o email não contem o símbolo @, logo é Inválido
    else this.isEmailInvalido = true;
    })
    //Se entrar na exceção significa que ja existe o email informado
    .catch(error =>{
      this.isEmailInvalido = true;
    })
  }
}
