/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { RestResponseOfPagedResourcesOfRol } from '../models/rest-response-of-paged-resources-of-rol';
import { Rol } from '../models/rol';
import { RolAltaDto } from '../models/rol-alta-dto';
import { RolEditDto } from '../models/rol-edit-dto';

/**
 * Servicios para el alta,baja y modificacion de los roles
 */
@Injectable({
  providedIn: 'root',
})
class RolService extends __BaseService {
  static readonly getAllRolesUsingGETPath = '/rol';
  static readonly AltaDeUnRolPath = '/rol';
  static readonly BorrarUnRolPath = '/rol/{id}';
  static readonly EditarUnRolPath = '/rol/{id}';
  static readonly agregaUnPermisoAUnRolPath = '/rol/{id}/add_permiso';
  static readonly sacaUnPermisoAUnRolPath = '/rol/{id}/del_permiso';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `RolService.GetAllRolesUsingGETParams` containing the following parameters:
   *
   * - `sort`:
   *
   * - `size`:
   *
   * - `page`:
   *
   * - `nombre`: Ingrese el identificador del Rol
   *
   * - `id`: Ingrese el id del rol
   *
   * - `descripcion`: Ingrese la descripcion del rol
   *
   * - `baja`: Ingrese el estado del rol, true activo, false desactivado
   *
   * @return OK
   */
  getAllRolesUsingGETResponse(params: RolService.GetAllRolesUsingGETParams): __Observable<__StrictHttpResponse<RestResponseOfPagedResourcesOfRol>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.nombre != null) __params = __params.set('nombre', params.nombre.toString());
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.descripcion != null) __params = __params.set('descripcion', params.descripcion.toString());
    if (params.baja != null) __params = __params.set('baja', params.baja.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/rol`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RestResponseOfPagedResourcesOfRol>;
      })
    );
  }
  /**
   * @param params The `RolService.GetAllRolesUsingGETParams` containing the following parameters:
   *
   * - `sort`:
   *
   * - `size`:
   *
   * - `page`:
   *
   * - `nombre`: Ingrese el identificador del Rol
   *
   * - `id`: Ingrese el id del rol
   *
   * - `descripcion`: Ingrese la descripcion del rol
   *
   * - `baja`: Ingrese el estado del rol, true activo, false desactivado
   *
   * @return OK
   */
  getAllRolesUsingGET(params: RolService.GetAllRolesUsingGETParams): __Observable<RestResponseOfPagedResourcesOfRol> {
    return this.getAllRolesUsingGETResponse(params).pipe(
      __map(_r => _r.body as RestResponseOfPagedResourcesOfRol)
    );
  }

  /**
   * Alta de un rol
   * @param rolAltaDto rolAltaDto
   * @return OK
   */
  AltaDeUnRolResponse(rolAltaDto: RolAltaDto): __Observable<__StrictHttpResponse<Rol>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = rolAltaDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/rol`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Rol>;
      })
    );
  }
  /**
   * Alta de un rol
   * @param rolAltaDto rolAltaDto
   * @return OK
   */
  AltaDeUnRol(rolAltaDto: RolAltaDto): __Observable<Rol> {
    return this.AltaDeUnRolResponse(rolAltaDto).pipe(
      __map(_r => _r.body as Rol)
    );
  }

  /**
   * Borrar un rol
   * @param id id
   * @return OK
   */
  BorrarUnRolResponse(id: number): __Observable<__StrictHttpResponse<Rol>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/rol/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Rol>;
      })
    );
  }
  /**
   * Borrar un rol
   * @param id id
   * @return OK
   */
  BorrarUnRol(id: number): __Observable<Rol> {
    return this.BorrarUnRolResponse(id).pipe(
      __map(_r => _r.body as Rol)
    );
  }

  /**
   * Editar un rol
   * @param params The `RolService.EditarUnRolParams` containing the following parameters:
   *
   * - `rolEditDto`: rolEditDto
   *
   * - `id`: id
   *
   * @return OK
   */
  EditarUnRolResponse(params: RolService.EditarUnRolParams): __Observable<__StrictHttpResponse<Rol>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.rolEditDto;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rol/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Rol>;
      })
    );
  }
  /**
   * Editar un rol
   * @param params The `RolService.EditarUnRolParams` containing the following parameters:
   *
   * - `rolEditDto`: rolEditDto
   *
   * - `id`: id
   *
   * @return OK
   */
  EditarUnRol(params: RolService.EditarUnRolParams): __Observable<Rol> {
    return this.EditarUnRolResponse(params).pipe(
      __map(_r => _r.body as Rol)
    );
  }

  /**
   * agrega un permiso a un rol
   * @param params The `RolService.AgregaUnPermisoAUnRolParams` containing the following parameters:
   *
   * - `idPermiso`: idPermiso
   *
   * - `id`: id
   *
   * @return OK
   */
  agregaUnPermisoAUnRolResponse(params: RolService.AgregaUnPermisoAUnRolParams): __Observable<__StrictHttpResponse<Rol>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.idPermiso;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rol/${params.id}/add_permiso`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Rol>;
      })
    );
  }
  /**
   * agrega un permiso a un rol
   * @param params The `RolService.AgregaUnPermisoAUnRolParams` containing the following parameters:
   *
   * - `idPermiso`: idPermiso
   *
   * - `id`: id
   *
   * @return OK
   */
  agregaUnPermisoAUnRol(params: RolService.AgregaUnPermisoAUnRolParams): __Observable<Rol> {
    return this.agregaUnPermisoAUnRolResponse(params).pipe(
      __map(_r => _r.body as Rol)
    );
  }

  /**
   * saca un permiso a un rol
   * @param params The `RolService.SacaUnPermisoAUnRolParams` containing the following parameters:
   *
   * - `idPermiso`: idPermiso
   *
   * - `id`: id
   *
   * @return OK
   */
  sacaUnPermisoAUnRolResponse(params: RolService.SacaUnPermisoAUnRolParams): __Observable<__StrictHttpResponse<Rol>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.idPermiso;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/rol/${params.id}/del_permiso`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Rol>;
      })
    );
  }
  /**
   * saca un permiso a un rol
   * @param params The `RolService.SacaUnPermisoAUnRolParams` containing the following parameters:
   *
   * - `idPermiso`: idPermiso
   *
   * - `id`: id
   *
   * @return OK
   */
  sacaUnPermisoAUnRol(params: RolService.SacaUnPermisoAUnRolParams): __Observable<Rol> {
    return this.sacaUnPermisoAUnRolResponse(params).pipe(
      __map(_r => _r.body as Rol)
    );
  }
}

module RolService {

  /**
   * Parameters for getAllRolesUsingGET
   */
  export interface GetAllRolesUsingGETParams {
    sort?: string;
    size?: number;
    page?: number;

    /**
     * Ingrese el identificador del Rol
     */
    nombre?: string;

    /**
     * Ingrese el id del rol
     */
    id?: number;

    /**
     * Ingrese la descripcion del rol
     */
    descripcion?: string;

    /**
     * Ingrese el estado del rol, true activo, false desactivado
     */
    baja?: boolean;
  }

  /**
   * Parameters for EditarUnRol
   */
  export interface EditarUnRolParams {

    /**
     * rolEditDto
     */
    rolEditDto: RolEditDto;

    /**
     * id
     */
    id: number;
  }

  /**
   * Parameters for agregaUnPermisoAUnRol
   */
  export interface AgregaUnPermisoAUnRolParams {

    /**
     * idPermiso
     */
    idPermiso: number;

    /**
     * id
     */
    id: number;
  }

  /**
   * Parameters for sacaUnPermisoAUnRol
   */
  export interface SacaUnPermisoAUnRolParams {

    /**
     * idPermiso
     */
    idPermiso: number;

    /**
     * id
     */
    id: number;
  }
}

export { RolService }
