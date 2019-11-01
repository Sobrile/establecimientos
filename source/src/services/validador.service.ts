/* tslint:disable */
import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpResponse, HttpHeaders} from '@angular/common/http';
import {BaseService as __BaseService} from '../base-service';
import {ApiConfiguration as __Configuration} from '../api-configuration';
import {StrictHttpResponse as __StrictHttpResponse} from '../strict-http-response';
import {Observable as __Observable} from 'rxjs';
import {map as __map, filter as __filter} from 'rxjs/operators';


import {environment} from '../environments/environment';

/**
 * Validator Service
 */
@Injectable({
    providedIn: 'root',
})
class ValidadorService extends __BaseService {
  private errorsForm: any;

    constructor(
        config: __Configuration,
        http: HttpClient
    ) {
        super(config, http);
    }

    validarCampos(data,columnas) {
        this.Log("datos para validar", data);
        var index;
        this.errorsForm = [];
        var proceso = {}
        var validado = true;
        columnas.forEach(campo => {
            if (campo.required == true && campo.disabled == false && data[campo.field] == null) {
                var dat = {
                    valid: false,
                    message: "El campo " + campo.header + " es obligatorio"
                }
                validado = false;
                this.errorsForm[campo.field] = dat;
            } else {
                if (campo.type && data[campo.field] != null) {
                    switch (campo.type) {
                        case "number":
                            if (typeof data[campo.field] === 'number') {
                                // this.Log("se valida columna number ", campo.field);
                                var dat = {
                                    valid: true,
                                    message: ""
                                }
                                this.errorsForm[campo.field] = dat;
                            } else {
                                var dat = {
                                    valid: false,
                                    message: "El campo " + campo.header + " Debe ser un valor numerico"
                                }
                                validado = false;
                                this.errorsForm[campo.field] = dat;


                            }
                            break;
                        case "string":
                            if (typeof data[campo.field] === 'string') {
                                if (campo.pattern) {
                                    if (data[campo.field].match && data[campo.field].match(campo.pattern)) {
                                        var dat = {
                                            valid: true,
                                            message: ""
                                        }
                                        this.errorsForm[campo.field] = dat;
                                    } else {
                                        var dat = {
                                            valid: false,
                                            message: "El campo " + campo.header + " es inválido solo letras"
                                        }
                                        validado = false;
                                        this.errorsForm[campo.field] = dat;
                                    }
                                }
                            } else {
                                var dat = {
                                    valid: false,
                                    message: "El campo " + campo.header + " es inválido debe ser alfanumérico"
                                }
                                validado = false;
                                this.errorsForm[campo.field] = dat;
                            }
                            break;
                        case "year":

                            if (typeof data[campo.field] == "string") {
                                var date = new Date(data[campo.field] + "-01-01T00:00:00-03:00")

                                var dat = {
                                    valid: true,
                                    message: ""
                                }
                                this.errorsForm[campo.field] = dat;
                                //   this.Log(typeof (data[campo.field]), "se valida columna year ", campo.field, "  year", data[campo.field]);
                            } else {
                                //   this.Log(typeof (data[campo.field]), "no se valida columna year ", campo.field, "  year", data[campo.field]);
                                var dat = {
                                    valid: false,
                                    message: "El campo " + campo.header + " debe ser un año"
                                }
                                validado = false;
                                this.errorsForm[campo.field] = dat;

                            }
                            break;
                        case "date":
                            if (data[campo.field] && typeof data[campo.field] == "object") {
                                var dat = {
                                    valid: true,
                                    message: ""
                                }
                                this.errorsForm[campo.field] = dat;
                            } else {
                                var dat = {
                                    valid: false,
                                    message: "El campo " + campo.header + " debe ser un fecha"
                                }
                                validado = false;
                                this.errorsForm[campo.field] = dat;

                            }
                            break;
                        default:
                            break;
                    }

                }
            }

        })
        this.Log("errores", this.errorsForm);
        var num = 100;
        var c = 1;
        return validado
    }
    getErrorForm()
    {
        return this.errorsForm;
    }
    Log(param1, param2: any) {
        if (environment.production == false) {
            console.log(param1, param2);
        }
    }

}

export {ValidadorService}