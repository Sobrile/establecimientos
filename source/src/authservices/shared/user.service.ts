import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {ApiConfiguration} from '../../api-configuration';
import {BaseService} from '../../base-service';

import {SessionService} from '../../services/session.service';

@Injectable()
export class UserService extends BaseService {
    remoteip: string;

    constructor(
        config: ApiConfiguration,
        http: HttpClient,
        private session: SessionService
    ) {
        super(config, http);
    }
    getIP() {
        const reqHeader = new HttpHeaders();
        return this.http.get('https://ipinfo.io', {headers: reqHeader}); // ...using post request
    }
    userAuthentication(userName, password, captchaResponse) {
        var data = {
          'username': userName,
          'password': password,
          'captcha_response': captchaResponse
        };
        const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
        return this.http.post(this.rootUrl + '/usuario/login', data, {headers: reqHeader});
    }

    verificaCaptcha() {
        const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
        return this.http.get(this.rootUrl + '/usuario/captcha_activado', {headers: reqHeader}); // ...using post request
    }

    getConfigUrl() {
        const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
        return this.http.get('assets/config/config.json', {headers: reqHeader});

    }

    getRootUrl() {
        return this.rootUrl;
    }


    Logout(token) {
        const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
        return this.http.post(this.rootUrl + '/usuario/logout?token=' + token, null);
    }

    getUserClaims() {

        const user = this.session.getUserFromSession();
        const cuil = user ? user.cuil : undefined;
        const userToken = user ? user.token : undefined;

        const reqHeader = new HttpHeaders({'Accept': '"*/*"', 'Authorization': '' + userToken});
        return this.http.get(this.rootUrl + `/api/user/${cuil}`);
    }


}
