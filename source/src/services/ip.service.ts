import {Injectable} from '@angular/core';
// import {Observable as __Observable} from 'rxjs';
import {Subscriber} from 'rxjs';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ApiConfiguration as __Configuration } from '../api-configuration';
// import {ApiConfiguration} from '../../api-configuration';
import { BaseService as __BaseService } from '../base-service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable({
    providedIn: 'root'
})
export class IpService{
    public Data:any;
    constructor(
        private http: HttpClient
    ) {
    }
    getLocalIP(){
        const reqHeader = new HttpHeaders();
        return this.http.get('http://api.ipify.org/?format=json&callback=JSONP_CALLBACK',{headers: reqHeader,responseType: 'json' }) // ...using post request
    }
    getPublicIP(){
       const reqHeader = new HttpHeaders();
       return this.http.get('https://api.ipify.org/?format=json&callback=JSONP_CALLBACK',{headers: reqHeader,responseType: 'json' }) // ...using post request
    }
}
