/* tslint:disable */
import { Menu } from './menu';
import { Link } from './link';
import { PageMetadata } from './page-metadata';
export interface PagedResourcesOfMenu {
  embedded?: Array<Menu>;
  links?: Array<Link>;
  page?: PageMetadata;
}
