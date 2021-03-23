import { gql, useQuery } from '@apollo/client';
import ModelHelper from '../helpers/ModelHelper';

const GetCustomers = (limit: Number, sort: String) => {

  var filters = {
    limit: limit,
    sort: sort
  }

  var filtersQuery = ModelHelper.GetFilters(filters);

  const query = gql`
    {
      CustomerMany ${filtersQuery} {
        name
        lastname
        phone
        address
        town
        updated_at
      }
    }
  `;

  let { data } = useQuery(query);

  var customers = [];

  if (data) {
    customers = data['CustomerMany'] ?? [];
  }

  return customers;

};

export default {GetCustomers};
