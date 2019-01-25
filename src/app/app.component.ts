import { Component, ViewChild } from '@angular/core';
import { Nav, Events, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { Profissional } from '../provider/profissional';
import { Funcionario } from '../provider/funcionario';
import { StatusModal } from '../pages/modal/status';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public funcionario;
  public data = new Date().toISOString();
  public profissional: Profissional;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public event: Events) {

      this.initializeApp();

      event.subscribe('professional:created', (p) => {
        this.profissional = p;
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.profissional = JSON.parse(sessionStorage.getItem('profissional'));
      this.nav.setRoot(this.profissional ? HomePage : LoginPage, { profissional : this.profissional });

      let data = sessionStorage.getItem('data');
      if(data){
        this.data = new Date(data).toISOString();
      }

    });
  }

  filter(){
    sessionStorage.setItem('data', this.data.replace('T', ' ').substring(0, 19));
    this.nav.setRoot(HomePage, { 
      profissional : this.profissional, 
      funcionario  : this.funcionario,
      data         : this.data
    });
  }

  onChange(value){
    this.funcionario = value;
    this.event.publish('funcionario:created', this.funcionario, Date.now());
  }

  logout() {
    sessionStorage.removeItem('profissional');
    this.nav.setRoot(LoginPage);
  }
}
