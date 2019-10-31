import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import _ from 'lodash';

import { SessionService } from '../../services/session.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router : Router,
    private session: SessionService,
    private _permissionsService: NgxPermissionsService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {

      const user = this.session.getUserFromSession();

      if (user){

        //TODO: delete after
        //const perm = ["RECHAZAR_EVALUACION", "DESCARGAR_EVALUACION", "EVALUAR_EVALUACION"];
        //this._permissionsService.loadPermissions(perm);

        //first extract all permission from roles and then extract the name of each one
        this._permissionsService.loadPermissions(_.map(_.flatMap(user.roles,'permisos'), 'nombre'));

        return true;
      }
      this.router.navigate(['/login']);
      return false;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
