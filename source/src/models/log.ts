/* tslint:disable */
import { Usuario } from './usuario';
export interface Log {
  request_object?: string;
  date_log?: string;
  id?: number;
  ip_addres?: string;
  nombre_metodo?: string;
  query_string?: string;
  request_mapping?: string;
  http_method?: string;
  response_object?: string;
  status_code_response?: string;
  tiempo_ejecucion?: string;
  usuario?: Usuario;
  usuario_ape_nom?: string;
  usuario_cuil?: string;
  usuario_id?: number;
}
