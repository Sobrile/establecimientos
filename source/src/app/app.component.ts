import { Component, HostListener, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { UsuarioService } from '../services/usuario.service';
import { VERSION } from '../environments/version';

import { BasePageComponent } from './components/base-page/base-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent extends BasePageComponent implements OnInit {
  static USER_KEY = 'userLoggedIn';
  version = VERSION;

  // event: EventEmitter<any> = new EventEmitter<any>();
  public refresh_time_env = VERSION.time_refresh;
  public refresh_time_back: any;

  errorMessage: any;

  constructor(private messageService: MessageService,
    private usuarioService: UsuarioService,
    private session: SessionService) {
    super(messageService);
  }

  ngOnInit() {

    var user = this.session.getUserFromSession();

    if (user && user.lastClick) {
      if (!user.refresh_time_back) {
        this.getConfig();
      }
      else {
        this.refresh_time_back = user.refresh_time_back;
      }
    }
  }

  getConfig() {
    this.usuarioService.getConfigUsingGET()
      .subscribe(
        response => {
          var config = response;
          if (!config) {
            alert('error en el servidor');
          } else {
            if (config['body'] && config['body']['core_properties'] && config['body']['core_properties']['security_jwt_ttoken_expire_length']) {
              this.refresh_time_back = config['body']['core_properties']['security_jwt_ttoken_expire_length'];
              var user = this.session.getUserFromSession()
              if (this.refresh_time_back) {
                user.refresh_time_back = this.refresh_time_back;
                this.session.updateUserSession(user);
              }
            }
            this.Log("resp refresh_time_back", this.refresh_time_back);

          }
        },
        error => {
          this.errorMessage = <any>error;
          this.Log("Error config ", this.errorMessage);
          if (this.errorMessage.error && this.errorMessage.error['body'] && this.errorMessage.status) {
            var resp = this.errorMessage.error['body'];
            this.showError("Error consulta config ", this.errorMessage.error['body'])
          } else {

            if (this.errorMessage.error && this.errorMessage.error.description) {
              this.showError("Error ", this.errorMessage.error.description)

            }
            else {
              this.showError("Error ", "servidor fuera de servicio")
            }
          }
        }
      );
  }

  @HostListener('click', ['""', '$event'])
  onEvent(greeting: string, event: any) {
    this.refreshToken();
    this.clear();
  }

  refreshToken() {
    var user = this.session.getUserFromSession();
    if (user && user.lastClick) {
      var now = new Date().getTime()
      var timeLogged = (now - user.lastClick) / 60 / 1000;
      // this.Log("time logged", timeLogged)
      // this.Log("token de session 1 ", user.token);
      // this.Log("back  ", this.refresh_time_back);
      var refresh_time_back = this.refresh_time_back / 1000 / 60 / 2;
      // this.Log("back  local", refresh_time_back);
      var refresh_time: number;
      if (refresh_time_back > 0) {
        refresh_time = refresh_time_back;
      } else {
        refresh_time = this.refresh_time_env;
      }
      //     this.Log("env tiempo refresh login logueado ", timeLogged + ">= config=" + refresh_time);
      if (timeLogged >= refresh_time) {
        user.lastClick = now;
        this.usuarioService.RetornaUnTockenNuevo()
          .subscribe(resp => {
            if (resp['body'] && resp['body'] != "") {
              user.token = resp['body']
              this.Log("token nuevo ", user)
              this.session.saveOnSession(AppComponent.USER_KEY, user)
            }
          },
            error => {
              this.errorMessage = <any>error;
              this.Log("Error ", this.errorMessage);
              if (this.errorMessage.error && this.errorMessage.error['body'] && this.errorMessage.status) {
                var resp = this.errorMessage.error['body'];
                this.showError("Error consulta config ", this.errorMessage.error['body'])
              } else {
                // this.event.preventDefault();
                if (this.errorMessage.error && this.errorMessage.error.description) {
                  this.showError("Error ", this.errorMessage.error.description)
                }
                else {
                  this.showError("Error ", "servidor fuera de servicio")
                }
              }
            });
      }
    }
  }
}
