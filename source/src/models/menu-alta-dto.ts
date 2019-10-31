/* tslint:disable */
export interface MenuAltaDto {

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
  nombre: string;

  /**
   * Ingrese el id del menu padre, por defecto es null, sin padre
   */
  parent_id?: number;

  /**
   * Ingrese la ruta del menu
   */
  ruta: string;
}
