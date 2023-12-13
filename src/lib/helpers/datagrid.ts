import { FilterOption } from "lib/services/playground/schemas";

interface SortingQuery {
  [key: string]: 'asc' | 'desc' | SortingQuery;
}

export const buildSortingQuery = (sort: string, order: 'asc' | 'desc'): SortingQuery  => {
  const columns = sort.split('.');
  if (columns.length === 1) {
    return {
      [sort]: order,
    };
  }
  return {[columns[0]]: buildSortingQuery(columns.slice(1).join('.'), order)};
};

interface UpdateQuery {
  [key: string | 'update']: UpdateQuery | any;
}


export const getKeyEntry = (key: string, value: unknown): UpdateQuery | undefined => {
  if (typeof value !== 'object' || value === null) {
    if (key === 'id') return undefined;
    return {[key]: value};
  }
  const fields = Object.entries(value) ?? [];
  if (fields.length === 0) return undefined;
  let entries = {};
  for (const field of fields) {
    const [k, v] = field;
    if (k === 'id') continue;
    entries = {...entries, ...getKeyEntry(k, v)};
  }
  return {[key]: { update: entries}}
}

export const buildUpdateQuery = (data: { [key: string]: unknown }) => {
  const keys = Object.keys(data);
  let query: UpdateQuery = {};
  for (const key of keys) {
    query = {...query, ...getKeyEntry(key, data[key])};
  }
  return query;
}

interface FilterQuery {
  [key: string | 'where']: FilterQuery | any;
}

const getFilterCondition = (column: string, filter: FilterOption['filter']) => {
  console.log(filter.type);
  switch (filter.type) {
    case 'contains':
      return {[column]: {contains: filter.filter}};
    case 'notContains':
      return {NOT: {[column]: {contains: filter.filter}}};
    case 'blank':
      return {[column]: ''};
    case 'notBlank':
      return {NOT: {[column]: ''}};
    case 'notEqual':
      return {NOT: {[column]: filter.filter}};
    case 'equal':
      return {[column]: filter.filter};
    case 'startsWith':
      return {[column]: {startsWith: filter.filter}};
    case 'endsWith':
      return {[column]: {endsWith: filter.filter}};
    default:
      if (!filter.filter) return {};
      return {[column]: filter.filter};
  }
}

const getFilterEntry = (column: string, filter: FilterOption['filter']): FilterQuery  => {
  const chunks = column.split('.');
  if (chunks.length === 1) {
    return getFilterCondition(column, filter);
  }
  return {[chunks[0]]: getFilterEntry(chunks.slice(1).join('.'), filter)};
}

export const buildFilterQuery = (filters: FilterOption[]) => {
  let query = {};
  for (const filter of filters) {
    query = {...query, ...getFilterEntry(filter.column, filter.filter)};
  }
  return query;

};

