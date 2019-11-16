import { sortBy } from 'lodash';
import { Hit } from '../interfaces/hit';

export const DEFAULT_QUERY = 'redux';
export const DEFAULT_HPP = '100';
export const PATH_BASE = 'https://hn.algolia.com/api/v1';
export const PATH_SEARCH = '/search';
export const PARAM_SEARCH = 'query=';
export const PARAM_PAGE = 'page=';
export const PARAM_HPP = 'hitsPerPage=';

export const SORTS: {
  [sortKey: string]: (list: Hit[]) => Hit[];
} = {
  NONE: (list: Hit[]) => list,
  TITLE: (list: Hit[]) => sortBy(list, 'title'),
  AUTHOR: (list: Hit[]) => sortBy(list, 'author'),
  COMMENTS: (list: Hit[]) => sortBy(list, 'num_comments').reverse(),
  POINTS: (list: Hit[]) => sortBy(list, 'points').reverse(),
};
