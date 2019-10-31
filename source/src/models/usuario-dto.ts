/* tslint:disable */
import { Rol } from './rol';
export interface UsuarioDto {
  apellido?: string;
  bloqueado?: boolean;
  correo?: string;
  cuil?: string;
  cuil_con_guiones?: string;
  fecha_modificacion_password?: string;
  id?: number;
  nombre?: string;
  roles?: Array<Rol>;
}
