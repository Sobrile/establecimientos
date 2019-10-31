/* tslint:disable */
export interface MenuEditDto {

  /**
   * Ingrese el estado del menu, true activo, false desactivado
   */
  baja?: boolean;

  /**
   * Ingrese el orden del menu, no obligatorio
   */
  children_order?: number;
  color?: string;
  estilo?: string;
  icono?: string;

  /**
   * Ingrese el nombre del menu
   */
  nombre?: string;

  /**
   * Ingrese el id del menu padre, por defecto es null, sin padre
   */
  parent_id?: number;

  /**
   * Ingrese la ruta del menu
   */
  ruta?: string;
}
