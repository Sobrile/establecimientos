/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Log } from '../models/log';

/**
 * Servicios de consulta de logs
 */
@Injectable({
  providedIn: 'root',
})
class LogsService extends __BaseService {
  static readonly BUSCARLOGSFILTROSPath = '/log/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Lista todos los logs
   * @param params The `LogsService.BUSCARLOGSFILTROSParams` containing the following parameters:
   *
   * - `usuarioId`:
   *
   * - `tiempoEjecucion`:
   *
   * - `statusCodeResponse`:
   *
   * - `sort`:
   *
   * - `size`:
   *
   * - `responseObject`:
   *
   * - `requestObject`:
   *
   * - `requestMapping`:
   *
   * - `queryString`:
   *
   * - `page`:
   *
   * - `nombreMetodo`:
   *
   * - `ipAddres`:
   *
   * - `id`:
   *
   * - `httpMethod`:
   *
   * - `dateLog`:
   *
   * @return OK
   */
  BUSCARLOGSFILTROSResponse(params: LogsService.BUSCARLOGSFILTROSParams): __Observable<__StrictHttpResponse<Log>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.usuarioId != null) __params = __params.set('usuarioId', params.usuarioId.toString());
    if (params.tiempoEjecucion != null) __params = __params.set('tiempoEjecucion', params.tiempoEjecucion.toString());
    if (params.statusCodeResponse != null) __params = __params.set('statusCodeResponse', params.statusCodeResponse.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.responseObject != null) __params = __params.set('responseObject', params.responseObject.toString());
    if (params.requestObject != null) __params = __params.set('requestObject', params.requestObject.toString());
    if (params.requestMapping != null) __params = __params.set('requestMapping', params.requestMapping.toString());
    if (params.queryString != null) __params = __params.set('queryString', params.queryString.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.nombreMetodo != null) __params = __params.set('nombreMetodo', params.nombreMetodo.toString());
    if (params.ipAddres != null) __params = __params.set('ipAddres', params.ipAddres.toString());
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.httpMethod != null) __params = __params.set('httpMethod', params.httpMethod.toString());
    if (params.dateLog != null) __params = __params.set('dateLog', params.dateLog.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/log/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Log>;
      })
    );
  }
  /**
   * Lista todos los logs
   * @param params The `LogsService.BUSCARLOGSFILTROSParams` containing the following parameters:
   *
   * - `usuarioId`:
   *
   * - `tiempoEjecucion`:
   *
   * - `statusCodeResponse`:
   *
   * - `sort`:
   *
   * - `size`:
   *
   * - `responseObject`:
   *
   * - `requestObject`:
   *
   * - `requestMapping`:
   *
   * - `queryString`:
   *
   * - `page`:
   *
   * - `nombreMetodo`:
   *
   * - `ipAddres`:
   *
   * - `id`:
   *
   * - `httpMethod`:
   *
   * - `dateLog`:
   *
   * @return OK
   */
  BUSCARLOGSFILTROS(params: LogsService.BUSCARLOGSFILTROSParams): __Observable<Log> {
    return this.BUSCARLOGSFILTROSResponse(params).pipe(
      __map(_r => _r.body as Log)
    );
  }
}

module LogsService {

  /**
   * Parameters for BUSCARLOGSFILTROS
   */
  export interface BUSCARLOGSFILTROSParams {
    usuarioId?: number;
    tiempoEjecucion?: string;
    statusCodeResponse?: string;
    sort?: string;
    size?: number;
    responseObject?: string;
    requestObject?: string;
    requestMapping?: string;
    queryString?: string;
    page?: number;
    nombreMetodo?: string;
    ipAddres?: string;
    id?: number;
    httpMethod?: string;
    dateLog?: string;
  }
}

export { LogsService }
