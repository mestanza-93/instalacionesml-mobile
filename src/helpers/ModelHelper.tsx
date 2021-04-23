import FilterInterface from "../interfaces/Filters";

const GetFilters = (filters: FilterInterface) => {
  var result = "";
  var arrayFilters = new Array();

  if (filters.limit && filters.limit > 0) {
    arrayFilters.push(`limit: ${filters.limit}`);
  }

  if (filters.sort) {
    arrayFilters.push(`sort: ${filters.sort}`);
  }

  if (arrayFilters) {
    result = "(" + arrayFilters.join(",") + ")";
  }

  return result;
};

const FilterId = (id: string) => {
  var result = "";

  if (id) {
    result = `(_id: "${id}")`;
  }

  return result;
};

const FilterField = (id: string, field: string) => {
  var result = "";

  if (id && field) {
    result = `(filter: {${field}: "${id}"})`;
  }

  return result;
};

export default { GetFilters, FilterId, FilterField };
