/* tslint:disable */
import { Rol } from './rol';
import { Link } from './link';
import { PageMetadata } from './page-metadata';
export interface PagedResourcesOfRol {
  embedded?: Array<Rol>;
  links?: Array<Link>;
  page?: PageMetadata;
}
