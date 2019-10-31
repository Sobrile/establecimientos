import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,

} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';

import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Location} from '@angular/common';

import {SessionService} from '../../services/session.service';
import { GLOBALS } from '../../environments/globals';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    static USER_KEY = 'userLoggedIn';
    globals=GLOBALS;

    constructor(private router: Router, private location: Location, private session: SessionService) {
    }
    private handleError(error: Response | any) {
        console.error(error);
        alert("catch ");
        return Observable.throw(error); // <= B
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.globals.isContentLoading=true;
        if (req.headers.get('No-Auth') == "True" || req.url.indexOf('api')>0 || req.url.indexOf('servicios')>0 || req.url.indexOf('ws.usig')>0 ) {
            return next.handle(
                req.clone({
                })
            )
                .do(
                    succ => {
                        if (succ.type!=0) {
                            this.globals.isContentLoading = false;
                        }
                    },
                    err => {
                        console.log("err ",err);
                        this.globals.isContentLoading=false;

                        if (err.status === 401 ) {
                            console.log(err.error.description);
                            this.session.removeUserFromSession()
                            this.router.navigateByUrl("/login")
                            this.globals.isExpired=true;
                            return Observable.empty();
                        }

                        if (err.status === 403) {
                            if (err.error.message && err.error.error == "Forbidden") {
                                alert("no tiene permisos " + err.error.message)
                            }
                            console.log("error permisos", err.error.message);
                            return false;
                        }


                    }
                );
            ;
        }
        const user = this.session.getUserFromSession();
        if (user) {
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", 'Bearer ' + user.token)
            });
            var token = user.token;
            // console.log("interceptor con auth ", token);

            var head = req.clone({
                setHeaders: {

                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'Authorization': "Bearer " + `${token}`,
                    'Accept-Language': 'en-US'


                },
            });

            //    console.log("head ", head);
           // environment.isContentLoading=false;
            return next.handle(head)

                .do(
                    succ => {
                        if (succ.type!=0) {
                            this.globals.isContentLoading = false;
                        }
                    },
                    err => {

                      //  console.log("error interceptor",err);
                        this.globals.isContentLoading=false;

                        if (err.status === 401 ) {
                            console.log(err.error.description);
                            this.session.removeUserFromSession()
                            this.router.navigateByUrl("/login")
                            this.globals.isExpired=true;
                            return Observable.empty();
                        }

                        if (err.status === 403) {
                            if (err.error.message && err.error.error == "Forbidden") {
                                alert("no tiene permisos " + err.error.message)
                            }
                            console.log("error permisos", err.error.message);
                            return false;
                        }


                    }
                );
        }

    }
}
