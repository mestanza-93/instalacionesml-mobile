import FilterInterface from '../interfaces/Filters';

const GetFilters = (filters: FilterInterface) => {

  var result = '';
  var arrayFilters = new Array;

  if (filters.limit && filters.limit > 0) {
    arrayFilters.push(`limit: ${filters.limit}`);
  }

  if (filters.sort) {
    arrayFilters.push(`sort: ${filters.sort}`);
  }

  if (arrayFilters) {
    result = "(" + arrayFilters.join(',') + ")";
  }

  return result;

};

export default {GetFilters};
