/* tslint:disable */
import { Permiso } from './permiso';
import { Link } from './link';
import { PageMetadata } from './page-metadata';
export interface PagedResourcesOfPermiso {
  embedded?: Array<Permiso>;
  links?: Array<Link>;
  page?: PageMetadata;
}
