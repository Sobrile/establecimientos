/* tslint:disable */
import { Permiso } from './permiso';
export interface Menu {
  baja?: boolean;
  children_order?: number;
  color?: string;
  estilo?: string;
  icono?: string;
  id?: number;
  nombre?: string;
  parent_id?: number;
  permiso?: Permiso;
  ruta?: string;
}
