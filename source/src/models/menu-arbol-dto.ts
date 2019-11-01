/* tslint:disable */
export interface MenuArbolDto {
  children_order?: number;
  color?: string;
  estilo?: string;
  hijos?: Array<MenuArbolDto>;
  icono?: string;
  id?: number;
  nombre?: string;
  padre?: MenuArbolDto;
  parent_id?: number;
  ruta?: string;
}
