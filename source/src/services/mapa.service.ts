import {Injectable} from '@angular/core';
import {Observable as __Observable} from 'rxjs';
import {Observable, Subscriber} from 'rxjs';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ApiConfiguration as __Configuration } from '../api-configuration';
// import {ApiConfiguration} from '../../api-configuration';
import { BaseService as __BaseService } from '../base-service';
@Injectable({
    providedIn: 'root'
})
export class MapaService{
    // http://servicios.usig.buenosaires.gob.ar/usig-js/3.0/demos/AutoCompleter.html
    coordenadas
    // http://ws.usig.buenosaires.gob.ar/geocoder/2.2/smp?cod_calle=3001&altura=5790
    private usigUrl: string = "https://servicios.usig.buenosaires.gob.ar";
    private usigWs: string = "http://ws.usig.buenosaires.gob.ar";

    // private ServiciosUsig: string = "http://servicios.usig.buenosaires.gob.ar/LocDir/mapa.phtml";
    // private epokService: string = "http://epok.buenosaires.gob.ar/buscar"

    constructor(

        private http: HttpClient

    ) {

    }
    getCoordenadas(cod_calle, altura) {
        const reqHeader = new HttpHeaders();
        return this.http.get(this.usigWs + '/geocoder/2.2/geocoding?cod_calle='+ cod_calle + '&altura=' + altura, {headers: reqHeader,responseType: 'text'});


    }
    getCallesNormalizadas(direccion) {
        const reqHeader = new HttpHeaders();
        return this.http.get(this.usigUrl + "/normalizar/?direccion="+direccion, {headers: reqHeader});
    }
    getMapa(x, y,calleAltura) {
        // console.log("datos",x," ",y,"ca  ",calleAltura)
        const reqHeader = new HttpHeaders();
        return this.http.get(this.usigUrl + '/LocDir/mapa.phtml?x='+x+'&y='+y+'&punto=1&desc='+calleAltura, {headers: reqHeader,responseType: 'blob' });


    }

}
