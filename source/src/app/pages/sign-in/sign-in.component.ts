import {Component, OnInit,ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {Captcha} from 'primeng/captcha';
import {environment} from '../../../environments/environment';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
// import {Injectable} from '@angular/core';
import {throwError} from 'rxjs';
// import {retry, catchError} from 'rxjs/operators';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    keyframes
} from '@angular/animations';
import {
    HttpClient, HttpErrorResponse

} from '@angular/common/http';
import {SessionService} from '../../../services/session.service';
import {UserService} from '../../../authservices/shared/user.service';
import {MessageModule} from 'primeng/message';
import {GLOBALS} from '../../../environments/globals';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    animations: [
        trigger('loginScreenAnimation', [
            state('invalid', style({})),
            state('unchecked', style({})),
            state('completed', style({transform: 'translateX(150%)'})),
            transition('unchecked => invalid', animate(250, keyframes([
                style({transform: 'translateX(-10%)'}),
                style({transform: 'translateX(10%)'}),
                style({transform: 'translateX(-10%)'}),
                style({transform: 'translateX(10%)'})
            ]))),
            transition('unchecked => completed', animate('1250ms 1s ease-out'))
        ])
    ],
    styleUrls: ['./sign-in.component.css'],
    providers: [UserService]
})


export class SignInComponent implements OnInit {
    isLoginError: boolean = false;
    isBackError: boolean = false;
    isExpired: boolean = false;
    isCaptchaError: boolean = false;
    loginScreenAnimation: string = 'unchecked';
    captchaResponse: string = "";
    verificaCaptcha: boolean = false;
    mensajeError: string;
    mensajeErrorCaptcha: string;
    rootUrl: string;
    template: string = "<img src='assets/images/loader.gif'>";
    public password: string;


    @ViewChild('ca') captcha: Captcha;

    constructor(private userService: UserService,
                private router: Router, private http: HttpClient,
                private location: Location,
                private spinnerService: Ng4LoadingSpinnerService,
                private session: SessionService,
                private messages: MessageModule
                ) {

    }

    Log(param1, param2 = "") {

        if (environment.production == false) {
            console.log(param1, param2);
        }

    }
    ngDoCheck(){
        this.isExpired=GLOBALS.isExpired;
    }
    ngOnInit() {
        if (this.session.getUserFromSession()) {
            this.router.navigate(['/home']);

        }

        this.isExpired=GLOBALS.isExpired;


    }

    verificarCaptcha() {
        this.userService.verificaCaptcha().subscribe((data: any) => {

                if (data.body == true) {
                    this.verificaCaptcha = true;
                } else {
                    this.verificaCaptcha = false;
                }
            },
            (err: HttpErrorResponse) => {

                //  this.handleError(err);
                if (err.message && err.message.match(/unknown url/)) {
                    this.isBackError = true;
                    if (this.rootUrl) {

                        this.Log("Aplicacion fuera de servicio o ssl no valido", this.rootUrl);
                    }
                }
                if (this.verificaCaptcha==true) {
                    this.captcha.reset();
                }
            });
    }

    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error

            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        //window.alert(errorMessage);
        if (this.verificaCaptcha==true) {
            this.captcha.reset();
        }
        return throwError(errorMessage);
    }


    Clean() {
        this.isLoginError = false;
        this.mensajeError = ""
        this.isExpired=false;
        GLOBALS.isExpired=false;
        console.log("clean")
        this.password="";
    }

    OnSubmit(userName, password) {
        this.spinnerService.show();
        this.mensajeErrorCaptcha = "";
        this.mensajeError = "";
        this.isCaptchaError = false;
        this.isLoginError = false;
        this.userService.userAuthentication(userName, password, this.captchaResponse).subscribe((data: any) => {
                this.spinnerService.hide();

                if (data.body.token && data.body.token!="") {

                    this.isLoginError = false;
                    const token = data.body.token;
                    const nombre = data.body.usuario.nombre;
                    const apellido = data.body.usuario.apellido;

               //     let promise = new Promise((resolve, reject) => {
                        this.session.createUserOnSession({
                            'token': token,
                            'cuil': userName,
                            'nombre': nombre,
                            'apellido': apellido,
                            'roles': data.body.usuario.roles
                        })
                            this.isLoginError = false;
                            this.isCaptchaError = false;
                            this.mensajeError = "";
                            this.router.navigateByUrl("/home");
                  //  })
                }
            },
            (errorResponse: HttpErrorResponse) => {
                this.spinnerService.hide();
                this.isLoginError = true;
                this.password=""
                switch (errorResponse.error['codigo']) {
                    case "2-3":
                        if (errorResponse.error.body && errorResponse.error.body!="") {
                            this.mensajeError = errorResponse.error.body;
                        }
                        else
                        {
                            this.mensajeError = "Credenciales Invalidas"
                        }
                        if (this.verificaCaptcha==true) {
                            this.captcha.reset();
                        }

                    break;
                    case "2-1":
                    case "2-4":
                            this.mensajeError = "Usuario Bloqueado Ingrese el Captcha"
                            this.verificarCaptcha();
                                if (this.verificaCaptcha==true) {
                                    this.captcha.reset();
                                }

                    break;
                    default:
                        this.mensajeError = "Error desconocido"
                }
            });
    }

    setBackToUnchecked() {
        if (this.loginScreenAnimation === 'invalid') {
            this.loginScreenAnimation = 'unchecked';
        }
    }

    showResponse(captchaResponse) {
        //call to a backend to verify against recaptcha with private key
        this.captchaResponse = captchaResponse.response;
    }

}
