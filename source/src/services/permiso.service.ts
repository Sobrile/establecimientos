/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { RestResponseOfPagedResourcesOfPermiso } from '../models/rest-response-of-paged-resources-of-permiso';
import { Permiso } from '../models/permiso';
import { PermisoAltaDto } from '../models/permiso-alta-dto';
import { PermisoEditDto } from '../models/permiso-edit-dto';

/**
 * Servicios para el alta,baja y modificacion de los permisos
 */
@Injectable({
  providedIn: 'root',
})
class PermisoService extends __BaseService {
  static readonly getAllPermisosUsingGETPath = '/permiso';
  static readonly AltaDeUnPermisoPath = '/permiso';
  static readonly BorrarUnPermisoPath = '/permiso/{id}';
  static readonly EditarUnPermisoPath = '/permiso/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `PermisoService.GetAllPermisosUsingGETParams` containing the following parameters:
   *
   * - `sort`:
   *
   * - `size`:
   *
   * - `page`:
   *
   * - `nombre`: Ingrese el identificador del Rol
   *
   * - `menu_id`: Ingrese el identificador del menu
   *
   * - `logear`: true o false
   *
   * - `id`: id del permiso
   *
   * - `descripcion`: Ingrese la descripcion del rol
   *
   * - `categoria_permiso_id`: Ingrese el identificador de la categoria
   *
   * - `baja`: true o false
   *
   * @return OK
   */
  getAllPermisosUsingGETResponse(params: PermisoService.GetAllPermisosUsingGETParams): __Observable<__StrictHttpResponse<RestResponseOfPagedResourcesOfPermiso>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.nombre != null) __params = __params.set('nombre', params.nombre.toString());
    if (params.menuId != null) __params = __params.set('menu_id', params.menuId.toString());
    if (params.logear != null) __params = __params.set('logear', params.logear.toString());
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.descripcion != null) __params = __params.set('descripcion', params.descripcion.toString());
    if (params.categoriaPermisoId != null) __params = __params.set('categoria_permiso_id', params.categoriaPermisoId.toString());
    if (params.baja != null) __params = __params.set('baja', params.baja.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/permiso`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RestResponseOfPagedResourcesOfPermiso>;
      })
    );
  }
  /**
   * @param params The `PermisoService.GetAllPermisosUsingGETParams` containing the following parameters:
   *
   * - `sort`:
   *
   * - `size`:
   *
   * - `page`:
   *
   * - `nombre`: Ingrese el identificador del Rol
   *
   * - `menu_id`: Ingrese el identificador del menu
   *
   * - `logear`: true o false
   *
   * - `id`: id del permiso
   *
   * - `descripcion`: Ingrese la descripcion del rol
   *
   * - `categoria_permiso_id`: Ingrese el identificador de la categoria
   *
   * - `baja`: true o false
   *
   * @return OK
   */
  getAllPermisosUsingGET(params: PermisoService.GetAllPermisosUsingGETParams): __Observable<RestResponseOfPagedResourcesOfPermiso> {
    return this.getAllPermisosUsingGETResponse(params).pipe(
      __map(_r => _r.body as RestResponseOfPagedResourcesOfPermiso)
    );
  }

  /**
   * Alta de un permiso
   * @param permisoAltaDto permisoAltaDto
   * @return OK
   */
  AltaDeUnPermisoResponse(permisoAltaDto: PermisoAltaDto): __Observable<__StrictHttpResponse<Permiso>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = permisoAltaDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/permiso`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Permiso>;
      })
    );
  }
  /**
   * Alta de un permiso
   * @param permisoAltaDto permisoAltaDto
   * @return OK
   */
  AltaDeUnPermiso(permisoAltaDto: PermisoAltaDto): __Observable<Permiso> {
    return this.AltaDeUnPermisoResponse(permisoAltaDto).pipe(
      __map(_r => _r.body as Permiso)
    );
  }

  /**
   * Borrar un permiso
   * @param id id
   * @return OK
   */
  BorrarUnPermisoResponse(id: number): __Observable<__StrictHttpResponse<Permiso>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/permiso/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Permiso>;
      })
    );
  }
  /**
   * Borrar un permiso
   * @param id id
   * @return OK
   */
  BorrarUnPermiso(id: number): __Observable<Permiso> {
    return this.BorrarUnPermisoResponse(id).pipe(
      __map(_r => _r.body as Permiso)
    );
  }

  /**
   * Editar un permiso
   * @param params The `PermisoService.EditarUnPermisoParams` containing the following parameters:
   *
   * - `request`: request
   *
   * - `id`: id
   *
   * @return OK
   */
  EditarUnPermisoResponse(params: PermisoService.EditarUnPermisoParams): __Observable<__StrictHttpResponse<Permiso>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.request;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/permiso/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Permiso>;
      })
    );
  }
  /**
   * Editar un permiso
   * @param params The `PermisoService.EditarUnPermisoParams` containing the following parameters:
   *
   * - `request`: request
   *
   * - `id`: id
   *
   * @return OK
   */
  EditarUnPermiso(params: PermisoService.EditarUnPermisoParams): __Observable<Permiso> {
    return this.EditarUnPermisoResponse(params).pipe(
      __map(_r => _r.body as Permiso)
    );
  }
}

module PermisoService {

  /**
   * Parameters for getAllPermisosUsingGET
   */
  export interface GetAllPermisosUsingGETParams {
    sort?: string;
    size?: number;
    page?: number;

    /**
     * Ingrese el identificador del Rol
     */
    nombre?: string;

    /**
     * Ingrese el identificador del menu
     */
    menuId?: number;

    /**
     * true o false
     */
    logear?: boolean;

    /**
     * id del permiso
     */
    id?: number;

    /**
     * Ingrese la descripcion del rol
     */
    descripcion?: string;

    /**
     * Ingrese el identificador de la categoria
     */
    categoriaPermisoId?: number;

    /**
     * true o false
     */
    baja?: boolean;
  }

  /**
   * Parameters for EditarUnPermiso
   */
  export interface EditarUnPermisoParams {

    /**
     * request
     */
    request: PermisoEditDto;

    /**
     * id
     */
    id: number;
  }
}

export { PermisoService }
