import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NgxPermissionsGuard} from 'ngx-permissions';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from '../authservices/auth/auth.guard';
/***************** modulo usuarios roles ****************************/
import {SignInComponent} from './pages/sign-in/sign-in.component';
import {RolesComponent} from './admin-usuarios/roles/roles.component';
import {PermisosComponent} from './admin-usuarios/permisos/permisos.component';
import {MenusComponent} from './admin-usuarios/menus/menus.component';
import {UsuariosComponent} from './admin-usuarios/usuarios/usuarios.component';
/************* ******************************/
import {NoPermissionsComponent} from './pages/no-permissions/no-permissions.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {NotConfiguredComponent} from './pages/not-configured/not-configured.component';
import { ListadoDemoComponent } from './pages/listado-demo/listado-demo.component';

import { InspeccionesProgramadasComponent } from './pages/inspecciones-programadas/inspecciones-programadas.component';


const routes: Routes = [
  {
    path: 'login',
    component: SignInComponent
  },
  {
    path: '',
    redirectTo: '/listado-demo',
    pathMatch: 'full'
  },
  {
    path: '403-route',
    component: NoPermissionsComponent
  },
  {
    path: 'listado-demo',
    component: ListadoDemoComponent
  },

  /*{
    path: 'inspeccionesProgramadas',
    component: InspeccionesProgramadasComponent
  },*/

  // {
  //   path: '',
  //   component: ListadoDemoComponent,
  //   canActivate: [AuthGuard],
  //   runGuardsAndResolvers: 'always'
  // },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'gestion/Menu',
    component: MenusComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'gestion/Usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'gestion/Roles',
    component: RolesComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'gestion/Permisos',
    component: PermisosComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },


  {
    path: 'not-configured',
    component: NotConfiguredComponent
  },
  /*****************************************/
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '403',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
