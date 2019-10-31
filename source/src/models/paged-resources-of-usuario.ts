/* tslint:disable */
import { Usuario } from './usuario';
import { Link } from './link';
import { PageMetadata } from './page-metadata';
export interface PagedResourcesOfUsuario {
  embedded?: Array<Usuario>;
  links?: Array<Link>;
  page?: PageMetadata;
}
