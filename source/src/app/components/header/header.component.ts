import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { SessionService } from '../../../services/session.service';
import { Location } from '@angular/common';
import _ from 'lodash';
import { VERSION } from '../../../environments/version';
import {BasePageComponent} from '../../components/base-page/base-page.component';
import {MessageService} from 'primeng/components/common/messageservice';
import {MenuService} from '../../../services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [SessionService]

})
export class HeaderComponent extends BasePageComponent implements OnInit {
  version = VERSION;
  mostrarUsuario: boolean=false;
  mostrarMenu: boolean=false;
  loadMenu: boolean=false;
  home: MenuItem;
  user: any;

  /**************/
  public usuario: any;
  public css: any;
  public iconclass: any;
  public id: any;
  public errorMessage: any;
  public titulo: string;
  public menu: any[];
  public menus: any;
  public routeLocal: any;


  /**************/

  constructor(private session: SessionService,
              private activateRoute: ActivatedRoute,
              private router: Router
           ,private location: Location,
     private _menuService: MenuService,
              private route: Router,
      private messageService: MessageService,
  ) {

    super(messageService);
  }
  count(){
  }
  ngOnInit() {

  }
  ngOnChanges()
  {
    console.log("check changes header ")
  }
  ngDoCheck(){
   // console.log("check ");
    //console.log("check header ")
      if (this.session.getUserFromSession())
      {
        this.user=this.session.getUserFromSession()
        this.mostrarUsuario = true;
        if (this.loadMenu==false) {
          this.ConsultaMenu();
          this.loadMenu=true;
        }
        var url=window.location.href.split('/')[3];
        if (url!== 'login' && url!== '#' && url!== 'home') {
          this.mostrarMenu = true;
        }
        else {

          this.mostrarMenu = false;
        }
      }
      else
      {
        this.mostrarUsuario = false;
        this.mostrarMenu = false;
      }



  }
  ConsultaMenu() {
    this._menuService.listArbol()
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

  Logout() {
    this.session.removeUserFromSession();
    this.router.navigateByUrl("/login");

  }

}
