/* tslint:disable */
import { CategoriaPermiso } from './categoria-permiso';
import { Menu } from './menu';
import { Rol } from './rol';
export interface Permiso {
  baja?: boolean;
  categoria_permiso?: CategoriaPermiso;
  descripcion?: string;
  id?: number;
  logear?: boolean;
  menu?: Menu;
  nombre?: string;
  roles?: Array<Rol>;
}
