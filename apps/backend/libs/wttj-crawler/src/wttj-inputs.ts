import { REMOTE_VALUES, SORT_BY_VALUES } from '@joca/wttj-crawler/constants';

export interface WttjInputs {
  nbPages: number;
  query?: string;
  sortBy: SORT_BY_VALUES;
  city?: string;
  country?: string;
  remote?: REMOTE_VALUES[];
  level?: {
    min: number;
    max: number;
  };
}
