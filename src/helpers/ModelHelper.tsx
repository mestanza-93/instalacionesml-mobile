import FilterInterface from "../interfaces/Filters";

const GetFilters = (filters: FilterInterface) => {
  var result = "";
  var arrayFilters = new Array();

  if (filters.field && filters.fieldValue) {
    if (filters.fieldType == Number) {
      arrayFilters.push(`filter: {${filters.field}: ${filters.fieldValue}}`);
    } else {
      arrayFilters.push(`filter: {${filters.field}: "${filters.fieldValue}"}`);
    }
  }

  if (filters.field && filters.fieldType && filters.fieldType == 'operator' && filters.operators) {
    let operatorsQuery = "";
    filters.operators.forEach((operator) => {
      if (operatorsQuery) {
        operatorsQuery += ',';
      }
      operatorsQuery += `${operator.field}: "${operator.value}"`;
    });
    arrayFilters.push(`filter: {_operators: {${filters.field}: {${operatorsQuery}}}}`);
  }

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
