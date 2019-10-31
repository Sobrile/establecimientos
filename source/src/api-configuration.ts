/* tslint:disable */
import { Injectable,Component} from '@angular/core';
import {
    HttpClient, HttpRequest, HttpResponse,HttpErrorResponse,
    HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';
import 'rxjs/add/operator/map';
import { SessionService } from './services/session.service';
import {Router} from '@angular/router';
/**
 * Contains global configuration for API services
 */
@Injectable({
    providedIn: 'root',
})
export class ApiConfiguration {
    public rootUrl: string;
    data: any;
    constructor(private http: HttpClient,    private router: Router,
                private session: SessionService) {
        const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
        this.http.get('assets/config/config.json', {headers: reqHeader}).subscribe((data: any) => {
                this.rootUrl = data["urlBack"];
                if (data["urlBack"]=="")
                {
                    console.log("El archivo config assets/config/config.json  tiene la variable en blanco urlBack")
                    this.router.navigateByUrl("/not-configured");

                }
                if (this.rootUrl.indexOf("http")<0)
                {
                    this.rootUrl="https://"+this.rootUrl;
                }
                if (this.session.getFromSession('rootUrl') == null || this.rootUrl != this.session.getFromSession('rootUrl') ) {

                    this.session.saveOnSession('rootUrl', this.rootUrl);
                    location.reload()
                }
            },
            (err: HttpErrorResponse) => {
                console.log("No existe el archivo config")
                this.router.navigateByUrl("/not-configured");
            });
        if (this.rootUrl == null) {
            this.rootUrl = this.session.getFromSession('rootUrl');

        }
    }
    private extractData(res: Response) {
        // console.log(res);

        const body = res;
        return body || {};
    }
}
