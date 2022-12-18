import { SORT_BY_VALUES } from './constants';
import countries from './countries';

export interface Inputs {
  nbPages?: unknown;
  query?: unknown;
  sortBy?: unknown;
  city?: unknown;
  country?: unknown;
  remote?: unknown;
  minLevel?: unknown;
  maxLevel?: unknown;
}

export const validateInputs = async (inputs: Inputs) => {
  // nbPages Validator
  let nbPages;
  if (typeof inputs.nbPages === 'undefined') {
    nbPages = 1;
  } else if (typeof inputs.nbPages !== 'number') {
    throw new Error('The nbPages variable needs to be a number.');
  } else {
    nbPages = inputs.nbPages as number;
  }

  // query Validator
  let query;
  if (typeof inputs.query === 'undefined') {
    query = '';
  } else if (typeof inputs.query !== 'string') {
    throw new Error('The query variable needs to be a string.');
  } else {
    query = encodeURIComponent(inputs.query);
  }

  // sortBy Validator
  let sortBy;
  if (typeof inputs.sortBy === 'undefined') {
    sortBy = SORT_BY_VALUES.MOST_RELEVANT;
  } else if (!Object.values(SORT_BY_VALUES).includes(inputs.sortBy as SORT_BY_VALUES)) {
    throw new Error(
      `The sortBy variable needs to be included in: ${Object.values(
        SORT_BY_VALUES,
      )}.`,
    );
  } else {
    sortBy = encodeURIComponent(inputs.sortBy as SORT_BY_VALUES);
  }

  // country Validator
  let country;
  if (typeof inputs.country === 'undefined') {
    country = '';
  } else if (
    typeof inputs.country !== 'string' ||
    !countries.find(
      (c) => c.name.toLowerCase() === (inputs.country as string).toLowerCase(),
    )
  ) {
    throw new Error(`The country variable needs to be a country string.`);
  } else {
    country = encodeURIComponent(inputs.country);
  }

  // city Validator
  let city;
  if (typeof inputs.city === 'undefined') {
    city = '';
  } else if (typeof inputs.city !== 'string') {
    throw new Error(`The city variable needs to be a string.`);
  } else if (!country) {
    throw new Error(`Please select a country with the city.`);
  } else {
    city = encodeURIComponent(inputs.city);
  }

  // remote Validator
  let remote: string[];
  if (typeof inputs.remote === 'undefined') {
    remote = [];
  } else if (!Array.isArray(inputs.remote)) {
    throw new Error(`The remote variable needs to be an array.`);
  } else {
    remote = inputs.remote.map(encodeURIComponent);
  }

  // level Validator
  const minLevel = typeof inputs.minLevel === 'undefined' ? 0 : inputs.minLevel;
  const maxLevel =
    typeof inputs.maxLevel === 'undefined' ? 15 : inputs.minLevel;

  if (typeof minLevel !== 'number' || typeof maxLevel !== 'number') {
    throw new Error(`The level years needs to be numbers.`);
  } else if (minLevel > maxLevel) {
    throw new Error(
      `The minimum level years needs to be greater than the maximum level years.`,
    );
  }
  const level = {
    min: minLevel,
    max: maxLevel,
  };

  return { nbPages, query, sortBy, city, country, remote, level };
};
