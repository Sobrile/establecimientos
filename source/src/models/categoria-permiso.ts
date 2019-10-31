/* tslint:disable */
import { Permiso } from './permiso';
export interface CategoriaPermiso {
  descripcion?: string;
  id?: number;
  nombre?: string;
  permisos?: Array<Permiso>;
}
