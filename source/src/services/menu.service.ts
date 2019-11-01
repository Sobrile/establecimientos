/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { RestResponseOfPagedResourcesOfMenu } from '../models/rest-response-of-paged-resources-of-menu';
import { Menu } from '../models/menu';
import { MenuAltaDto } from '../models/menu-alta-dto';
import { ResponseMenueDto } from '../models/response-menue-dto';
import { MenuArbolDto } from '../models/menu-arbol-dto';
import { MenuEditDto } from '../models/menu-edit-dto';

/**
 * Servicios para el alta,baja y modificacion de los menues
 */
@Injectable({
  providedIn: 'root',
})
class MenuService extends __BaseService {
  static readonly getAllMenuesUsingGETPath = '/menu';
  static readonly AltaDeUnMenuPath = '/menu';
  static readonly getMenuesPath = '/menu/get_menues';
  static readonly listArbolPath = '/menu/list_arbol';
  static readonly listArbolPublicoPath = '/menu/list_arbol_publico';
  static readonly BorrarUnMenuPath = '/menu/{id}';
  static readonly EditarUnMenuPath = '/menu/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `MenuService.GetAllMenuesUsingGETParams` containing the following parameters:
   *
   * - `sort`:
   *
   * - `size`:
   *
   * - `route`: Ingrese la ruta del menu
   *
   * - `parent_id`: Ingrese el id del menu padre, por defecto es null, sin padre
   *
   * - `page`:
   *
   * - `nombre`: Ingrese el nombre del menu
   *
   * - `id`: Ingrese el id del menu
   *
   * - `icono`:
   *
   * - `estilo`:
   *
   * - `color`:
   *
   * - `children_order`: Ingrese el orden del menu, no obligatorio
   *
   * - `baja`: Ingrese el estado del menu, true activo, false desactivado
   *
   * @return OK
   */
  getAllMenuesUsingGETResponse(params: MenuService.GetAllMenuesUsingGETParams): __Observable<__StrictHttpResponse<RestResponseOfPagedResourcesOfMenu>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.route != null) __params = __params.set('route', params.route.toString());
    if (params.parentId != null) __params = __params.set('parent_id', params.parentId.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.nombre != null) __params = __params.set('nombre', params.nombre.toString());
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.icono != null) __params = __params.set('icono', params.icono.toString());
    if (params.estilo != null) __params = __params.set('estilo', params.estilo.toString());
    if (params.color != null) __params = __params.set('color', params.color.toString());
    if (params.childrenOrder != null) __params = __params.set('children_order', params.childrenOrder.toString());
    if (params.baja != null) __params = __params.set('baja', params.baja.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/menu`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RestResponseOfPagedResourcesOfMenu>;
      })
    );
  }
  /**
   * @param params The `MenuService.GetAllMenuesUsingGETParams` containing the following parameters:
   *
   * - `sort`:
   *
   * - `size`:
   *
   * - `route`: Ingrese la ruta del menu
   *
   * - `parent_id`: Ingrese el id del menu padre, por defecto es null, sin padre
   *
   * - `page`:
   *
   * - `nombre`: Ingrese el nombre del menu
   *
   * - `id`: Ingrese el id del menu
   *
   * - `icono`:
   *
   * - `estilo`:
   *
   * - `color`:
   *
   * - `children_order`: Ingrese el orden del menu, no obligatorio
   *
   * - `baja`: Ingrese el estado del menu, true activo, false desactivado
   *
   * @return OK
   */
  getAllMenuesUsingGET(params: MenuService.GetAllMenuesUsingGETParams): __Observable<RestResponseOfPagedResourcesOfMenu> {
    return this.getAllMenuesUsingGETResponse(params).pipe(
      __map(_r => _r.body as RestResponseOfPagedResourcesOfMenu)
    );
  }

  /**
   * Alta de un menu
   * @param menuAltaDto menuAltaDto
   * @return OK
   */
  AltaDeUnMenuResponse(menuAltaDto: MenuAltaDto): __Observable<__StrictHttpResponse<Menu>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = menuAltaDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/menu`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Menu>;
      })
    );
  }
  /**
   * Alta de un menu
   * @param menuAltaDto menuAltaDto
   * @return OK
   */
  AltaDeUnMenu(menuAltaDto: MenuAltaDto): __Observable<Menu> {
    return this.AltaDeUnMenuResponse(menuAltaDto).pipe(
      __map(_r => _r.body as Menu)
    );
  }

  /**
   * Obtiene la lista de menues en forma de arbol
   * @return OK
   */
  getMenuesResponse(): __Observable<__StrictHttpResponse<ResponseMenueDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/menu/get_menues`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResponseMenueDto>;
      })
    );
  }
  /**
   * Obtiene la lista de menues en forma de arbol
   * @return OK
   */
  getMenues(): __Observable<ResponseMenueDto> {
    return this.getMenuesResponse().pipe(
      __map(_r => _r.body as ResponseMenueDto)
    );
  }

  /**
   * Obtiene la lista de menues en forma de arbol
   * @return OK
   */
  listArbolResponse(): __Observable<__StrictHttpResponse<MenuArbolDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/menu/list_arbol`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MenuArbolDto>;
      })
    );
  }
  /**
   * Obtiene la lista de menues en forma de arbol
   * @return OK
   */
  listArbol(): __Observable<MenuArbolDto> {
    return this.listArbolResponse().pipe(
      __map(_r => _r.body as MenuArbolDto)
    );
  }

  /**
   * Obtiene la lista de menues publicos en forma de arbol
   * @return OK
   */
  listArbolPublicoResponse(): __Observable<__StrictHttpResponse<MenuArbolDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/menu/list_arbol_publico`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MenuArbolDto>;
      })
    );
  }
  /**
   * Obtiene la lista de menues publicos en forma de arbol
   * @return OK
   */
  listArbolPublico(): __Observable<MenuArbolDto> {
    return this.listArbolPublicoResponse().pipe(
      __map(_r => _r.body as MenuArbolDto)
    );
  }

  /**
   * Borrar un menu
   * @param id id
   * @return OK
   */
  BorrarUnMenuResponse(id: number): __Observable<__StrictHttpResponse<Menu>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/menu/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Menu>;
      })
    );
  }
  /**
   * Borrar un menu
   * @param id id
   * @return OK
   */
  BorrarUnMenu(id: number): __Observable<Menu> {
    return this.BorrarUnMenuResponse(id).pipe(
      __map(_r => _r.body as Menu)
    );
  }

  /**
   * Editar un menu
   * @param params The `MenuService.EditarUnMenuParams` containing the following parameters:
   *
   * - `menuAltaDto`: menuAltaDto
   *
   * - `id`: id
   *
   * @return OK
   */
  EditarUnMenuResponse(params: MenuService.EditarUnMenuParams): __Observable<__StrictHttpResponse<Menu>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.menuAltaDto;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/menu/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Menu>;
      })
    );
  }
  /**
   * Editar un menu
   * @param params The `MenuService.EditarUnMenuParams` containing the following parameters:
   *
   * - `menuAltaDto`: menuAltaDto
   *
   * - `id`: id
   *
   * @return OK
   */
  EditarUnMenu(params: MenuService.EditarUnMenuParams): __Observable<Menu> {
    return this.EditarUnMenuResponse(params).pipe(
      __map(_r => _r.body as Menu)
    );
  }
}

module MenuService {

  /**
   * Parameters for getAllMenuesUsingGET
   */
  export interface GetAllMenuesUsingGETParams {
    sort?: string;
    size?: number;

    /**
     * Ingrese la ruta del menu
     */
    route?: string;

    /**
     * Ingrese el id del menu padre, por defecto es null, sin padre
     */
    parentId?: number;
    page?: number;

    /**
     * Ingrese el nombre del menu
     */
    nombre?: string;

    /**
     * Ingrese el id del menu
     */
    id?: number;
    icono?: string;
    estilo?: string;
    color?: string;

    /**
     * Ingrese el orden del menu, no obligatorio
     */
    childrenOrder?: number;

    /**
     * Ingrese el estado del menu, true activo, false desactivado
     */
    baja?: boolean;
  }

  /**
   * Parameters for EditarUnMenu
   */
  export interface EditarUnMenuParams {

    /**
     * menuAltaDto
     */
    menuAltaDto: MenuEditDto;

    /**
     * id
     */
    id: number;
  }
}

export { MenuService }
