/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { RestResponseOfPagedResourcesOfUsuario } from '../models/rest-response-of-paged-resources-of-usuario';
import { RestResponse } from '../models/rest-response';
import { Usuario } from '../models/usuario';
import { UsuarioAltaDto } from '../models/usuario-alta-dto';
import { UsuarioDto } from '../models/usuario-dto';
import { ResultConfigDto } from '../models/result-config-dto';
import { RestResponseOfResultGetUsuarioADDto } from '../models/rest-response-of-result-get-usuario-addto';
import { LoginDto } from '../models/login-dto';
import { UsuarioEditDto } from '../models/usuario-edit-dto';

/**
 * Servicios para el alta,baja y modificacion de los usuarios, login, y acciones generales de los usuarios
 */
@Injectable({
  providedIn: 'root',
})
class UsuarioService extends __BaseService {
  static readonly getAllUsuariosUsingGETPath = '/usuario';
  static readonly AltaDeUsuarioADPath = '/usuario';
  static readonly addUsuarioRolPath = '/usuario/add-rol';
  static readonly AltaDeUsuarioInternoPath = '/usuario/altaInterno';
  static readonly captchaActivadoUsingGETPath = '/usuario/captcha_activado';
  static readonly getUsuarioByCuilUsingGETPath = '/usuario/cuil/{cuil}';
  static readonly getConfigUsingGETPath = '/usuario/get-configuracion';
  static readonly getUsuarioADUsingGETPath = '/usuario/get-usuario-AD';
  static readonly loginUsingPOSTPath = '/usuario/login';
  static readonly DeslogueoDeUnUsuarioPath = '/usuario/logout';
  static readonly RetornaUnTockenNuevoPath = '/usuario/refresh-token';
  static readonly ValidaUnTokenPath = '/usuario/validaToken';
  static readonly getUsuarioByIdUsingGETPath = '/usuario/{id}';
  static readonly BorrarUnUsuarioPath = '/usuario/{id}';
  static readonly EditarUsuarioPath = '/usuario/{id}';
  static readonly addRolPath = '/usuario/{id}/add-rol/{id_rol}';
  static readonly bloquearUsuarioPath = '/usuario/{id}/bloquear_usuario';
  static readonly delRolPath = '/usuario/{id}/del-rol/{id_rol}';
  static readonly desBloquearUsuarioPath = '/usuario/{id}/des_bloquear_usuario';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `UsuarioService.GetAllUsuariosUsingGETParams` containing the following parameters:
   *
   * - `sort`:
   *
   * - `size`:
   *
   * - `page`:
   *
   * - `nombre`: Ingrese Nombre identificador de usuario
   *
   * - `id`:
   *
   * - `cuil`: Ingrese el Cuil del usuario
   *
   * - `correo`: Ingrese el correo del usuario
   *
   * - `bloqueado`:
   *
   * - `apellido`: Ingrese apellido identificador de usuario
   *
   * @return OK
   */
  getAllUsuariosUsingGETResponse(params: UsuarioService.GetAllUsuariosUsingGETParams): __Observable<__StrictHttpResponse<RestResponseOfPagedResourcesOfUsuario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.nombre != null) __params = __params.set('nombre', params.nombre.toString());
    if (params.id != null) __params = __params.set('id', params.id.toString());
    if (params.cuil != null) __params = __params.set('cuil', params.cuil.toString());
    if (params.correo != null) __params = __params.set('correo', params.correo.toString());
    if (params.bloqueado != null) __params = __params.set('bloqueado', params.bloqueado.toString());
    if (params.apellido != null) __params = __params.set('apellido', params.apellido.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/usuario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RestResponseOfPagedResourcesOfUsuario>;
      })
    );
  }
  /**
   * @param params The `UsuarioService.GetAllUsuariosUsingGETParams` containing the following parameters:
   *
   * - `sort`:
   *
   * - `size`:
   *
   * - `page`:
   *
   * - `nombre`: Ingrese Nombre identificador de usuario
   *
   * - `id`:
   *
   * - `cuil`: Ingrese el Cuil del usuario
   *
   * - `correo`: Ingrese el correo del usuario
   *
   * - `bloqueado`:
   *
   * - `apellido`: Ingrese apellido identificador de usuario
   *
   * @return OK
   */
  getAllUsuariosUsingGET(params: UsuarioService.GetAllUsuariosUsingGETParams): __Observable<RestResponseOfPagedResourcesOfUsuario> {
    return this.getAllUsuariosUsingGETResponse(params).pipe(
      __map(_r => _r.body as RestResponseOfPagedResourcesOfUsuario)
    );
  }

  /**
   * @param cuil cuil
   * @return OK
   */
  AltaDeUsuarioADResponse(cuil?: string): __Observable<__StrictHttpResponse<RestResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (cuil != null) __params = __params.set('cuil', cuil.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/usuario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RestResponse>;
      })
    );
  }
  /**
   * @param cuil cuil
   * @return OK
   */
  AltaDeUsuarioAD(cuil?: string): __Observable<RestResponse> {
    return this.AltaDeUsuarioADResponse(cuil).pipe(
      __map(_r => _r.body as RestResponse)
    );
  }

  /**
   * Agrega un rol a un usuario
   * @param params The `UsuarioService.AddUsuarioRolParams` containing the following parameters:
   *
   * - `id_rol`: id_rol
   *
   * - `id`: id
   *
   * @return OK
   */
  addUsuarioRolResponse(params: UsuarioService.AddUsuarioRolParams): __Observable<__StrictHttpResponse<Usuario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idRol != null) __params = __params.set('id_rol', params.idRol.toString());
    if (params.id != null) __params = __params.set('id', params.id.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/usuario/add-rol`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Usuario>;
      })
    );
  }
  /**
   * Agrega un rol a un usuario
   * @param params The `UsuarioService.AddUsuarioRolParams` containing the following parameters:
   *
   * - `id_rol`: id_rol
   *
   * - `id`: id
   *
   * @return OK
   */
  addUsuarioRol(params: UsuarioService.AddUsuarioRolParams): __Observable<Usuario> {
    return this.addUsuarioRolResponse(params).pipe(
      __map(_r => _r.body as Usuario)
    );
  }

  /**
   * @param user user
   * @return OK
   */
  AltaDeUsuarioInternoResponse(user: UsuarioAltaDto): __Observable<__StrictHttpResponse<RestResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = user;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/usuario/altaInterno`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RestResponse>;
      })
    );
  }
  /**
   * @param user user
   * @return OK
   */
  AltaDeUsuarioInterno(user: UsuarioAltaDto): __Observable<RestResponse> {
    return this.AltaDeUsuarioInternoResponse(user).pipe(
      __map(_r => _r.body as RestResponse)
    );
  }

  /**
   * Obtiene la configuracion del capcha, true activado, false desactivado
   * @return OK
   */
  captchaActivadoUsingGETResponse(): __Observable<__StrictHttpResponse<RestResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/usuario/captcha_activado`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RestResponse>;
      })
    );
  }
  /**
   * Obtiene la configuracion del capcha, true activado, false desactivado
   * @return OK
   */
  captchaActivadoUsingGET(): __Observable<RestResponse> {
    return this.captchaActivadoUsingGETResponse().pipe(
      __map(_r => _r.body as RestResponse)
    );
  }

  /**
   * Obtiene usuario por cuil
   * @param cuil cuil
   * @return No se encuentra resultados
   */
  getUsuarioByCuilUsingGETResponse(cuil: string): __Observable<__StrictHttpResponse<UsuarioDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/usuario/cuil/${cuil}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UsuarioDto>;
      })
    );
  }
  /**
   * Obtiene usuario por cuil
   * @param cuil cuil
   * @return No se encuentra resultados
   */
  getUsuarioByCuilUsingGET(cuil: string): __Observable<UsuarioDto> {
    return this.getUsuarioByCuilUsingGETResponse(cuil).pipe(
      __map(_r => _r.body as UsuarioDto)
    );
  }

  /**
   * Obtiene la configuracion del sistema
   * @return OK
   */
  getConfigUsingGETResponse(): __Observable<__StrictHttpResponse<ResultConfigDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/usuario/get-configuracion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ResultConfigDto>;
      })
    );
  }
  /**
   * Obtiene la configuracion del sistema
   * @return OK
   */
  getConfigUsingGET(): __Observable<ResultConfigDto> {
    return this.getConfigUsingGETResponse().pipe(
      __map(_r => _r.body as ResultConfigDto)
    );
  }

  /**
   * @param cuil cuil
   * @return OK
   */
  getUsuarioADUsingGETResponse(cuil?: string): __Observable<__StrictHttpResponse<RestResponseOfResultGetUsuarioADDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (cuil != null) __params = __params.set('cuil', cuil.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/usuario/get-usuario-AD`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RestResponseOfResultGetUsuarioADDto>;
      })
    );
  }
  /**
   * @param cuil cuil
   * @return OK
   */
  getUsuarioADUsingGET(cuil?: string): __Observable<RestResponseOfResultGetUsuarioADDto> {
    return this.getUsuarioADUsingGETResponse(cuil).pipe(
      __map(_r => _r.body as RestResponseOfResultGetUsuarioADDto)
    );
  }

  /**
   * @param login login
   * @return OK
   */
  loginUsingPOSTResponse(login: LoginDto): __Observable<__StrictHttpResponse<RestResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = login;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/usuario/login`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RestResponse>;
      })
    );
  }
  /**
   * @param login login
   * @return OK
   */
  loginUsingPOST(login: LoginDto): __Observable<RestResponse> {
    return this.loginUsingPOSTResponse(login).pipe(
      __map(_r => _r.body as RestResponse)
    );
  }

  /**
   * @param token token
   * @return OK
   */
  DeslogueoDeUnUsuarioResponse(token?: string): __Observable<__StrictHttpResponse<RestResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (token != null) __params = __params.set('token', token.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/usuario/logout`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RestResponse>;
      })
    );
  }
  /**
   * @param token token
   * @return OK
   */
  DeslogueoDeUnUsuario(token?: string): __Observable<RestResponse> {
    return this.DeslogueoDeUnUsuarioResponse(token).pipe(
      __map(_r => _r.body as RestResponse)
    );
  }

  /**
   * @return OK
   */
  RetornaUnTockenNuevoResponse(): __Observable<__StrictHttpResponse<RestResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/usuario/refresh-token`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RestResponse>;
      })
    );
  }
  /**
   * @return OK
   */
  RetornaUnTockenNuevo(): __Observable<RestResponse> {
    return this.RetornaUnTockenNuevoResponse().pipe(
      __map(_r => _r.body as RestResponse)
    );
  }

  /**
   * @return OK
   */
  ValidaUnTokenResponse(): __Observable<__StrictHttpResponse<RestResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/usuario/validaToken`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RestResponse>;
      })
    );
  }
  /**
   * @return OK
   */
  ValidaUnToken(): __Observable<RestResponse> {
    return this.ValidaUnTokenResponse().pipe(
      __map(_r => _r.body as RestResponse)
    );
  }

  /**
   * Obtiene usuario por id
   * @param id id
   * @return No se encuentra resultados
   */
  getUsuarioByIdUsingGETResponse(id: number): __Observable<__StrictHttpResponse<UsuarioDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/usuario/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UsuarioDto>;
      })
    );
  }
  /**
   * Obtiene usuario por id
   * @param id id
   * @return No se encuentra resultados
   */
  getUsuarioByIdUsingGET(id: number): __Observable<UsuarioDto> {
    return this.getUsuarioByIdUsingGETResponse(id).pipe(
      __map(_r => _r.body as UsuarioDto)
    );
  }

  /**
   * Borrar un usuario
   * @param id id
   * @return OK
   */
  BorrarUnUsuarioResponse(id: number): __Observable<__StrictHttpResponse<Usuario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/usuario/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Usuario>;
      })
    );
  }
  /**
   * Borrar un usuario
   * @param id id
   * @return OK
   */
  BorrarUnUsuario(id: number): __Observable<Usuario> {
    return this.BorrarUnUsuarioResponse(id).pipe(
      __map(_r => _r.body as Usuario)
    );
  }

  /**
   * Editar un usuario
   * @param params The `UsuarioService.EditarUsuarioParams` containing the following parameters:
   *
   * - `usuarioEditDto`: usuarioEditDto
   *
   * - `id`: id
   *
   * @return OK
   */
  EditarUsuarioResponse(params: UsuarioService.EditarUsuarioParams): __Observable<__StrictHttpResponse<Usuario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.usuarioEditDto;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/usuario/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Usuario>;
      })
    );
  }
  /**
   * Editar un usuario
   * @param params The `UsuarioService.EditarUsuarioParams` containing the following parameters:
   *
   * - `usuarioEditDto`: usuarioEditDto
   *
   * - `id`: id
   *
   * @return OK
   */
  EditarUsuario(params: UsuarioService.EditarUsuarioParams): __Observable<Usuario> {
    return this.EditarUsuarioResponse(params).pipe(
      __map(_r => _r.body as Usuario)
    );
  }

  /**
   * Agrega un rol a un usuario
   * @param params The `UsuarioService.AddRolParams` containing the following parameters:
   *
   * - `id_rol`: id_rol
   *
   * - `id`: id
   *
   * @return OK
   */
  addRolResponse(params: UsuarioService.AddRolParams): __Observable<__StrictHttpResponse<Usuario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/usuario/${params.id}/add-rol/${params.idRol}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Usuario>;
      })
    );
  }
  /**
   * Agrega un rol a un usuario
   * @param params The `UsuarioService.AddRolParams` containing the following parameters:
   *
   * - `id_rol`: id_rol
   *
   * - `id`: id
   *
   * @return OK
   */
  addRol(params: UsuarioService.AddRolParams): __Observable<Usuario> {
    return this.addRolResponse(params).pipe(
      __map(_r => _r.body as Usuario)
    );
  }

  /**
   * bloquea a un usuario
   * @param id id
   * @return OK
   */
  bloquearUsuarioResponse(id: number): __Observable<__StrictHttpResponse<Usuario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/usuario/${id}/bloquear_usuario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Usuario>;
      })
    );
  }
  /**
   * bloquea a un usuario
   * @param id id
   * @return OK
   */
  bloquearUsuario(id: number): __Observable<Usuario> {
    return this.bloquearUsuarioResponse(id).pipe(
      __map(_r => _r.body as Usuario)
    );
  }

  /**
   * Saca un rol a un usuario
   * @param params The `UsuarioService.DelRolParams` containing the following parameters:
   *
   * - `id_rol`: id_rol
   *
   * - `id`: id
   *
   * @return OK
   */
  delRolResponse(params: UsuarioService.DelRolParams): __Observable<__StrictHttpResponse<Usuario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/usuario/${params.id}/del-rol/${params.idRol}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Usuario>;
      })
    );
  }
  /**
   * Saca un rol a un usuario
   * @param params The `UsuarioService.DelRolParams` containing the following parameters:
   *
   * - `id_rol`: id_rol
   *
   * - `id`: id
   *
   * @return OK
   */
  delRol(params: UsuarioService.DelRolParams): __Observable<Usuario> {
    return this.delRolResponse(params).pipe(
      __map(_r => _r.body as Usuario)
    );
  }

  /**
   * desbloquea a un usuario
   * @param id id
   * @return OK
   */
  desBloquearUsuarioResponse(id: number): __Observable<__StrictHttpResponse<Usuario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/usuario/${id}/des_bloquear_usuario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Usuario>;
      })
    );
  }
  /**
   * desbloquea a un usuario
   * @param id id
   * @return OK
   */
  desBloquearUsuario(id: number): __Observable<Usuario> {
    return this.desBloquearUsuarioResponse(id).pipe(
      __map(_r => _r.body as Usuario)
    );
  }
}

module UsuarioService {

  /**
   * Parameters for getAllUsuariosUsingGET
   */
  export interface GetAllUsuariosUsingGETParams {
    sort?: string;
    size?: number;
    page?: number;

    /**
     * Ingrese Nombre identificador de usuario
     */
    nombre?: string;
    id?: number;

    /**
     * Ingrese el Cuil del usuario
     */
    cuil?: string;

    /**
     * Ingrese el correo del usuario
     */
    correo?: string;
    bloqueado?: boolean;

    /**
     * Ingrese apellido identificador de usuario
     */
    apellido?: string;
  }

  /**
   * Parameters for addUsuarioRol
   */
  export interface AddUsuarioRolParams {

    /**
     * id_rol
     */
    idRol: number;

    /**
     * id
     */
    id: number;
  }

  /**
   * Parameters for EditarUsuario
   */
  export interface EditarUsuarioParams {

    /**
     * usuarioEditDto
     */
    usuarioEditDto: UsuarioEditDto;

    /**
     * id
     */
    id: number;
  }

  /**
   * Parameters for addRol
   */
  export interface AddRolParams {

    /**
     * id_rol
     */
    idRol: number;

    /**
     * id
     */
    id: number;
  }

  /**
   * Parameters for delRol
   */
  export interface DelRolParams {

    /**
     * id_rol
     */
    idRol: number;

    /**
     * id
     */
    id: number;
  }
}

export { UsuarioService }
