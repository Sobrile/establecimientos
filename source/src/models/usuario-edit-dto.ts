/* tslint:disable */
export interface UsuarioEditDto {

  /**
   * Ingrese apellido identificador de usuario
   */
  apellido: string;

  /**
   * bloqueado true o false
   */
  bloqueado?: boolean;

  /**
   * Ingrese el correo del usuario
   */
  correo?: string;

  /**
   * Ingrese Nombre identificador de usuario
   */
  nombre: string;
}
