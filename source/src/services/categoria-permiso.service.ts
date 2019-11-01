/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { RestResponseOfPagedResourcesOfCategoriaPermiso } from '../models/rest-response-of-paged-resources-of-categoria-permiso';
import { CategoriaPermiso } from '../models/categoria-permiso';
import { CategoriaPermisoDto } from '../models/categoria-permiso-dto';

/**
 * Servicios para el alta,baja y modificacion de categoria de los permiso
 */
@Injectable({
  providedIn: 'root',
})
class CategoriaPermisoService extends __BaseService {
  static readonly getAllCategoriasPermisosUsingGETPath = '/categoria_permiso';
  static readonly AltaDeUnaCategoriaPermisoPath = '/categoria_permiso';
  static readonly delPath = '/categoria_permiso/{id}';
  static readonly editPath = '/categoria_permiso/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consulta el listado de categorias de permisos
   * @param params The `CategoriaPermisoService.GetAllCategoriasPermisosUsingGETParams` containing the following parameters:
   *
   * - `sort`:
   *
   * - `size`:
   *
   * - `page`:
   *
   * - `nombre`: Ingrese el identificador de la categoria
   *
   * - `id`: Ingrese el id de la categoria
   *
   * - `descripcion`: Ingrese la descripcion de la categoria
   *
   * @return OK
   */
  getAllCategoriasPermisosUsingGETResponse(params: CategoriaPermisoService.GetAllCategoriasPermisosUsingGETParams): __Observable<__StrictHttpResponse<RestResponseOfPagedResourcesOfCategoriaPermiso>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.nombre != null) __params = __params.set('nombre', params.nombre.toString());
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.descripcion != null) __params = __params.set('descripcion', params.descripcion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/categoria_permiso`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RestResponseOfPagedResourcesOfCategoriaPermiso>;
      })
    );
  }
  /**
   * Consulta el listado de categorias de permisos
   * @param params The `CategoriaPermisoService.GetAllCategoriasPermisosUsingGETParams` containing the following parameters:
   *
   * - `sort`:
   *
   * - `size`:
   *
   * - `page`:
   *
   * - `nombre`: Ingrese el identificador de la categoria
   *
   * - `id`: Ingrese el id de la categoria
   *
   * - `descripcion`: Ingrese la descripcion de la categoria
   *
   * @return OK
   */
  getAllCategoriasPermisosUsingGET(params: CategoriaPermisoService.GetAllCategoriasPermisosUsingGETParams): __Observable<RestResponseOfPagedResourcesOfCategoriaPermiso> {
    return this.getAllCategoriasPermisosUsingGETResponse(params).pipe(
      __map(_r => _r.body as RestResponseOfPagedResourcesOfCategoriaPermiso)
    );
  }

  /**
   * Alta de una categoria permiso
   * @param categoriaPermisoDto categoriaPermisoDto
   * @return OK
   */
  AltaDeUnaCategoriaPermisoResponse(categoriaPermisoDto: CategoriaPermisoDto): __Observable<__StrictHttpResponse<CategoriaPermiso>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = categoriaPermisoDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/categoria_permiso`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CategoriaPermiso>;
      })
    );
  }
  /**
   * Alta de una categoria permiso
   * @param categoriaPermisoDto categoriaPermisoDto
   * @return OK
   */
  AltaDeUnaCategoriaPermiso(categoriaPermisoDto: CategoriaPermisoDto): __Observable<CategoriaPermiso> {
    return this.AltaDeUnaCategoriaPermisoResponse(categoriaPermisoDto).pipe(
      __map(_r => _r.body as CategoriaPermiso)
    );
  }

  /**
   * Borrar una categoria Permiso
   * @param id id
   * @return OK
   */
  delResponse(id: number): __Observable<__StrictHttpResponse<CategoriaPermiso>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/categoria_permiso/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CategoriaPermiso>;
      })
    );
  }
  /**
   * Borrar una categoria Permiso
   * @param id id
   * @return OK
   */
  del(id: number): __Observable<CategoriaPermiso> {
    return this.delResponse(id).pipe(
      __map(_r => _r.body as CategoriaPermiso)
    );
  }

  /**
   * Editar una categoria de pun permiso
   * @param params The `CategoriaPermisoService.EditParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `categoriaPermisoDto`: categoriaPermisoDto
   *
   * @return OK
   */
  editResponse(params: CategoriaPermisoService.EditParams): __Observable<__StrictHttpResponse<CategoriaPermiso>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.categoriaPermisoDto;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/categoria_permiso/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CategoriaPermiso>;
      })
    );
  }
  /**
   * Editar una categoria de pun permiso
   * @param params The `CategoriaPermisoService.EditParams` containing the following parameters:
   *
   * - `id`: id
   *
   * - `categoriaPermisoDto`: categoriaPermisoDto
   *
   * @return OK
   */
  edit(params: CategoriaPermisoService.EditParams): __Observable<CategoriaPermiso> {
    return this.editResponse(params).pipe(
      __map(_r => _r.body as CategoriaPermiso)
    );
  }
}

module CategoriaPermisoService {

  /**
   * Parameters for getAllCategoriasPermisosUsingGET
   */
  export interface GetAllCategoriasPermisosUsingGETParams {
    sort?: string;
    size?: number;
    page?: number;

    /**
     * Ingrese el identificador de la categoria
     */
    nombre?: string;

    /**
     * Ingrese el id de la categoria
     */
    id?: string;

    /**
     * Ingrese la descripcion de la categoria
     */
    descripcion?: string;
  }

  /**
   * Parameters for edit
   */
  export interface EditParams {

    /**
     * id
     */
    id: number;

    /**
     * categoriaPermisoDto
     */
    categoriaPermisoDto: CategoriaPermisoDto;
  }
}

export { CategoriaPermisoService }
