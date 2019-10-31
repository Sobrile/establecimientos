/* tslint:disable */
import { Rol } from './rol';
import { UsuarioAttempts } from './usuario-attempts';
export interface Usuario {
  cuil_con_guiones?: string;
  actualizado?: boolean;
  apellido_nombre?: string;
  bloqueado?: boolean;
  correo?: string;
  cuil?: string;
  apellido?: string;
  fecha_modificacion_password?: string;
  id?: number;
  nombre?: string;
  password?: string;
  roles?: Array<Rol>;
  usuario_attempts?: UsuarioAttempts;
}
