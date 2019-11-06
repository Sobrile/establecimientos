import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiConfiguration} from '../api-configuration';
import {AppRoutingModule} from './app-routing.module';
import {ModalModule} from 'ngx-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {ChartModule} from 'angular-highcharts';
import {AccordionModule} from 'primeng/accordion';
import {CalendarModule} from 'primeng/calendar';
import {PaginatorModule} from 'primeng/paginator';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToastModule} from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import {MessagesModule} from 'primeng/primeng';
import {MessageModule} from 'primeng/message';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {StepsModule} from 'primeng/steps';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import {NgxPermissionsModule} from 'ngx-permissions';
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';
import {ProgressBarModule} from 'primeng/progressbar';
import {FileUploadModule} from 'primeng/fileupload';
import {AutoCompleteModule} from 'primeng/autocomplete';
/*********************  Servicios *********************************/
import {AuthGuard} from '../authservices/auth/auth.guard';
import {AuthInterceptor} from '../authservices/auth/auth.interceptor';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ConfirmationService} from 'primeng/api';
/***************** modulo usuarios roles ****************************/
import {RolesComponent} from './admin-usuarios/roles/roles.component';
import {PermisosComponent} from './admin-usuarios/permisos/permisos.component';
import {MenusComponent} from './admin-usuarios/menus/menus.component';
import {UsuariosComponent} from './admin-usuarios/usuarios/usuarios.component';
import {AddUsuarioComponent} from './admin-usuarios/add-usuario/add-usuario.component';
/************* ******************************/
/****************app omponent ************************/
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {FormDialogComponent} from './components/form-dialog/form-dialog.component';
import {TableFilteredComponent} from './components/table-filtered/table-filtered.component';
import {ViewInfoDialogComponent} from './components/view-info-dialog/view-info-dialog.component';
import {ContextMenuModule} from 'primeng/contextmenu';
import {MenuModule} from 'primeng/menu';
import {SignInComponent} from './pages/sign-in/sign-in.component';
import {KeyFilterModule} from 'primeng/keyfilter';
import {BasePageComponent} from './components/base-page/base-page.component';
import {ButtonServeringComponent} from './components/button-servering/button-servering.component';
import {PickListModule} from 'primeng/picklist';
import {NoPermissionsComponent} from './pages/no-permissions/no-permissions.component';
import {ListboxModule} from 'primeng/listbox';
import {ConfirmActionDirective} from './directives/confirm-action.directive';
import {InputMaskModule} from 'primeng/inputmask';
import {CaptchaModule} from 'primeng/captcha';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {NotConfiguredComponent} from './pages/not-configured/not-configured.component';

import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { GrillaViewComponent } from './components/grilla-view/grilla-view.component';
import { ListadoDemoComponent } from './pages/listado-demo/listado-demo.component';

import { RouterModule } from '@angular/router'; // JASOBRILE
import { InspeccionesProgramadasComponent } from './pages/inspecciones-programadas/inspecciones-programadas.component';

@NgModule({
  declarations: [
    AppComponent,
    RolesComponent,
    PermisosComponent,
    MenusComponent,
    UsuariosComponent,
    AddUsuarioComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    FormDialogComponent,

    TableFilteredComponent,
    ViewInfoDialogComponent,
    SignInComponent,
    BasePageComponent,
    ButtonServeringComponent,
    NoPermissionsComponent,
    ConfirmActionDirective,
    PageNotFoundComponent,
    NotConfiguredComponent,
    GrillaViewComponent,
    ListadoDemoComponent,
    InspeccionesProgramadasComponent // JASOBRILE

  ],
  imports: [
    InputMaskModule,
    ListboxModule,
    PickListModule,
    ModalModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule,
    PaginatorModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    PanelModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    AccordionModule,
    DialogModule,
    DropdownModule,
    SliderModule,
    MultiSelectModule,
    ProgressBarModule,
    FileUploadModule,
    InputSwitchModule,
    InputTextareaModule,
    TableModule,
    RadioButtonModule,
    SelectButtonModule,
    StepsModule,
    ContextMenuModule,
    MenuModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    ChartModule,
    Ng4LoadingSpinnerModule.forRoot(),
    KeyFilterModule,
    OverlayPanelModule,
    NgxPermissionsModule.forRoot(),
    CaptchaModule, // Keep in mind the "forRoot"-magic nuances!
    ReactiveFormsModule,
    AutoCompleteModule
    // INI - JASOBRILE
    /*RouterModule.forRoot([
      { path: 'inspeccionesProgramadas' , component: InspeccionesProgramadasComponent }
    ])*/
    // FIN - JASOBRILE
  ],
  providers: [ApiConfiguration, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ConfirmationService
  ],

  bootstrap: [AppComponent]

})
export class AppModule {
}
