/* tslint:disable */
import { CategoriaPermiso } from './categoria-permiso';
import { Link } from './link';
import { PageMetadata } from './page-metadata';
export interface PagedResourcesOfCategoriaPermiso {
  embedded?: Array<CategoriaPermiso>;
  links?: Array<Link>;
  page?: PageMetadata;
}
