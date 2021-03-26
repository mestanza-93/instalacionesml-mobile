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
        _id
        name
        lastname
        phone
        address
        postalcode
        town
        updated_at
      }
    }
  `;

  const { data } = useQuery(query);

  var customers = [];

  if (data) {
    customers = data['CustomerMany'] ?? [];
  }

  return customers;

};

const GetCustomerById = (id: string) => {

  let customer = [];
  let queryId = ModelHelper.FilterId(id);

  const query = gql`
    {
      CustomerById ${queryId} {
        _id
        name
        lastname
        email
        phone
        phone2
        dni
        postalcode
        address
        town
        updated_at
      }
    }
  `;

  const { data } = useQuery(query);

  if (data) {
    customer = data['CustomerById'] ?? [];
  }

  return customer;
}

export default {GetCustomers, GetCustomerById};
