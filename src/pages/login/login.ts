import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Events, NavController, MenuController, LoadingController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { Profissional } from '../../provider/profissional';
import { Funcionario } from '../../provider/funcionario';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {

  public lembrar;
	public email;
	public senha;

  constructor(
    public menu: MenuController, 
    public nav: NavController, 
    public profissional: Profissional,
    public http: Http,
    public event: Events,
    public load: LoadingController
  ) {
    menu.enable(false, 'myMenu');
  }

  login(){

    let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }) });

    let loading = this.load.create({ content: "Verifying..." });
    loading.present();

    this.http.post(
      'https://clientes.fingerprint.com.br/kort/admin/index_cadastro_ajax.php', 
      { 
        email : this.email,
        senha : this.senha
      },
      options
    )
    .subscribe(
      data => {
        loading.dismissAll();
        let response = JSON.parse(data["_body"]);
        if(response.success){

          let funcionarios = []
          for(let i in response.info.h){
            let f  = new Funcionario();
            f.id   = response.info.h[i].a;
            f.nome = response.info.h[i].b;
            f.selected = response.info.a == response.info.h[i].a;
            funcionarios.push(f);
          }

          let p = new Profissional();
          p.email           = this.email;
          p.id_profissional = response.info.a;
          p.id_empresa      = response.info.b;
          p.cpf             = response.info.c;
          p.nome            = response.info.d;
          p.foto            = response.info.e;
          p.sexo            = response.info.f;
          p.admin           = response.info.g;
          p.lembrar         = this.lembrar;
          p.funcionarios    = funcionarios;
          this.profissional = p;

          this.event.publish('professional:created', this.profissional, Date.now());
          
          sessionStorage.setItem('profissional', JSON.stringify(this.profissional));
          this.nav.setRoot(HomePage, { profissional: this.profissional });
        } else {
          alert(response.msg);
        }
      },
      err => {
        loading.dismissAll();
        console.log(err);
      }
    );

  }

}
