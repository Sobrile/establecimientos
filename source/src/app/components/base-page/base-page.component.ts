import {Component} from '@angular/core';
// TODO: ESTO TIENE QUE ESTAR EN UNA VARIABLE DE ENTORNO
import {environment} from '../../../environments/environment';

import {MessageService} from 'primeng/components/common/messageservice';
@Component({
    selector: 'app-base-page',
    templateUrl: './base-page.component.html',
    styleUrls: ['./base-page.component.css']
})
export class BasePageComponent {
    protected _messageService: MessageService;
    protected static lifeToast: number = 10000;
    constructor(messageService: MessageService) {
        this._messageService = messageService;
    }
    Log(param1: any, param2: any) {
        if (environment.production == false) {
             console.log("-", param1, param2, "--bp-- ");
        }
    }

    showSuccess(mensaje, detail = "",sticky=false) {
        this._messageService.add({
            life: BasePageComponent.lifeToast,
            severity: 'success',
            summary: mensaje,
            detail: detail,
            id: "general",
            sticky: sticky
        });
    }
    showError(mensaje, detail = "",sticky=false) {
        this._messageService.add({
            life: BasePageComponent.lifeToast,
            severity: 'error',
            summary: mensaje,
            detail: detail,
            id: "general",
            sticky: sticky

        });
    }
    clear() {
        this._messageService.clear();
    }
    getDataFromCol(index, cols) {
        var camp = {}
        var campo = {}
        cols.forEach(campo => {
            if (index == campo.field) {
                camp = campo
            }
        })
        return camp;
    }
    getTF() {
        const tf = [
            {value: 1, label: "SI"},
            {value: 0, label: "NO"},
        ]
        return tf
    }
    /********** Funcion para poblar las tablas usuarios  ******/
    makeId(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    getDatefromStr(datestr) {
        if (typeof datestr === "string") {
            let dateArray = datestr.split("-")
            let year = dateArray[0];
            let month = dateArray[1];
            let day = dateArray[2];
            return new Date(year + "-" + month + "-" + day + "T00:00:00-0300")
        } else {
            return datestr;
        }
    }
    convertirFechaBd(fecha) {
        if (fecha) {
            return fecha.getFullYear() + "-" + this.getMonth(fecha) + "-" + this.getDate(fecha);
        }
    }
    getMonth(date) {
        var month = date.getMonth() + 1;
        return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
    }
    getDate(date) {
        var day = date.getDate();
        return day < 10 ? '0' + day : '' + day; // ('' + month) for string result
    }
    /**
     *  Transforma una key de snake un string a camelcase
     * @param snakestring
     */
    toCamelCase(snakestring) {
        if (snakestring != "") {
            var array = snakestring.split("_");
            var camelstring = "";
            if (array.length > 1) {
                camelstring = array[0] + array[1][0].toUpperCase() + array[1].slice(1);
                if (array.length == 3) {
                    camelstring = camelstring  + array[2][0].toUpperCase() + array[2].slice(1);
                }
                return camelstring;
            } else {
                return snakestring;
            }
        }

        return snakestring;
    }
    /**
     *  Se utiliza para manejar errores de una consulta de un servicio
     * @param errorMessage
     * @param descripcion
     */
    errorManagement(errorMessage,descripcion)
    {
        var errors:any;
        if (errorMessage.error && errorMessage.error.body && errorMessage.status) {
            var resp = errorMessage.error.body;
            var message=""
            if (typeof resp === "string") {
               message=resp;
            } else {
                    console.log("resp manejo error",resp)
                    if (resp.message) {
                        message=resp.message;
                        if (resp.message.errors) {
                            console.log("resp manejo errorsssssss",resp.message.errors)
                            resp.message.errors.forEach(data => {
                                message += data
                            });
                        }
                    }


            }
            this.showError("error de Guardado en "+descripcion, message)
        }

    }

    /**
     *  convierte un objeto de datos de un combo a un string
     * @param object
     */
    convertToString(object) {
        if (typeof object === "object" && object.value) {
            return object.value;
        }
        return object;
    }
    deleteMenuOnSession(session)
    {
        var user=session.getUserFromSession()
        if (user) {
            user.menu=null;
            session.updateUserSession(user);
        }
    }
}
