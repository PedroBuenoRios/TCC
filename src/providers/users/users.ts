import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersProvider {

  url = "http://localhost:3000/usuarios";
  constructor(public http:HttpClient) {
    
  }
  cadastrar(usuario:any){
    let headers = new HttpHeaders();
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
      return this.http.post(this.url,usuario);
      
  }

  logar(email:string,senha:string){
    return new Promise((resolve, reject) => {
    this.http
    //retorna um array com um objeto referente ao usuário
    .get(this.url + '?email=' + email +'&senha=' + senha)
    .subscribe((data) => {
      //se o array for maior que 0 significa que existe um usuário
      //e irá resolver a Promise
      if(data != 0)
        resolve(data);
      //se o array for igual a 0 significa que não existe o usuário
      // e irá rejeitar a Promise
      else reject("Usuário não Encontrado");
    },
      err => {
        reject("Usuário não Encontrado");
        console.log(err);
      });
  });
}
  criarSugestao(a){
    return this.http.post(this.url+"sugestoes",a);
  }

  query(a){
    return this.http.get(this.url+a);
  }
  comentar(a){
    return this.http.post(this.url+"comentarios",a);
   
  }
  getById(id){
    return new Promise((resolve, reject)=>{
      this.http
      //retorna um array de usuarios que contenham o id
      .get(this.url + "/${id}" )
      .subscribe(data =>{
        //se houver alguma coisa nesse array
        //significa que há algum usuário com esse id
        // e resolve a Promise
        if(data !=0 ) resolve(data);
        //se não houver significa que não há usuários com esse id
        // e resolve a Promise
        else reject("Não há usuários com este ID")
      },
      //Houve algum erro na hora de buscar pelo email
      err => reject(err));
    })
  }
  getByEmail(email){
    return new Promise((resolve, reject)=>{
      this.http
      //retorna um array de usuarios que contenham o email
      .get(this.url + "?email=" + email)
      .subscribe(data =>{
        //se houver alguma coisa nesse array
        //significa que há algum usuário com esse email
        // e rejeita a Promise
        if(data !=0 ) reject("Já existe uma Conta com esse email");
        //se não houver significa que não há usuários com esse email
        // e resolve a Promise
        else resolve("OK")
      },
      //Houve algum erro na hora de buscar pelo email
      err => reject(err));
    })
  }
}
