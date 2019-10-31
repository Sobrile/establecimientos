/* tslint:disable */
import { Permiso } from './permiso';
import { Usuario } from './usuario';
export interface Rol {
  authority?: string;
  baja?: boolean;
  descripcion?: string;
  id?: number;
  nombre?: string;
  permisos?: Array<Permiso>;
  usuario?: Array<Usuario>;
}
