/* tslint:disable */
export interface PermisoEditDto {

  /**
   * true o false
   */
  baja?: boolean;

  /**
   * Ingrese el identificador de la categoria
   */
  categoria_permiso_id?: number;

  /**
   * Ingrese la descripcion del rol
   */
  descripcion?: string;

  /**
   * true o false
   */
  logear?: boolean;

  /**
   * Ingrese el identificador del menu
   */
  menu_id?: number;

  /**
   * Ingrese el identificador del Rol
   */
  nombre?: string;
}
