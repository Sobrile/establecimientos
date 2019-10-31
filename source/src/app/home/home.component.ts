import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { SessionService } from '../../services/session.service';
import _ from 'lodash';
import { BasePageComponent } from '../components/base-page/base-page.component';
import { MessageService } from 'primeng/components/common/messageservice';

// S0n4rS3rv1c10
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SessionService]
})
export class HomeComponent extends BasePageComponent implements OnInit {
  public usuario: any;
  public css: any;
  public iconclass: any;
  public id: any;
  public errorMessage: any;
  public titulo: string;
  public menu: any[];
  public menus: any;
  loadMenu: false;

  constructor(
    private session: SessionService,
    private menuService: MenuService,
    private messageService: MessageService
  ) {
    super(messageService);
  }

  ngOnInit() {
    var user = this.session.getUserFromSession();

    if (user.menu) {
      // console.log("Consulte menu")
      this.menu = user.menu;
      // this.loadMenu = true;
    } else {
      this.ConsultaMenu();
    }
  }

  ConsultaMenu() {

    let c = 1;
    // this.menu.forEach(menu => {
    //     menu.numero = c;
    //     c++;
    // })
    this.menu = _.chunk(this.menu, 6);
    this.menuService.listArbol()
      .subscribe(resp => {
        if (!resp) {
          this.showError("Error en el servidor")
        } else {
          this.menu = [];
          this.menus = resp['body'];
          var c = 1;
          if (this.menus.length > 0) {
            this.menus.forEach(data => {

              if (data != null) {
                var item = {
                  titulo: data.nombre,
                  route: data.ruta,
                  numero: c,
                  color: data.estilo,
                  icon: data.icono
                };
                c++
                this.menu.push(item);

              }
            })
            this.menu = _.chunk(this.menu, 6);
            var user = this.session.getUserFromSession()
            if (user) {
              user.menu = this.menu;
              this.session.updateUserSession(user);
            }
          }
        }
      },
        error => {
          /******************/
          this.errorMessage = <any>error;
          this.Log("Error ", this.errorMessage);
          if (this.errorMessage.error && this.errorMessage.error.body && this.errorMessage.status) {
            var resp = this.errorMessage.error.body;
            this.Log("Error consulta ---->", this.errorMessage);
            this.showError("Error consulta ---->", this.errorMessage.error.body)
          } else {
            this.showError("Error ", "servidor fuera de servicio")
          }

          /**************************/


        });
  }


}
