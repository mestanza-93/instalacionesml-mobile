import { gql, useQuery } from '@apollo/client';
import ModelHelper from '../helpers/ModelHelper';
import CustomerInterface from '../interfaces/Customer';

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

const UpdateCustomer = (customer: CustomerInterface) => {

  let response = '';

  const query = gql`
    mutation {
      CustomerUpdateById(_id: "${customer._id}",
        record: {
          name: "${customer.name}",
          lastname: "${customer.lastname}",
          phone: ${customer.phone},
          phone2: ${customer.phone2},
          dni: "${customer.dni}",
          email: "${customer.email}",
          postalcode: ${customer.postalcode},
          address: "${customer.address}",
          town: "${customer.town}"
        }
      ) {
        recordId
      }
    }
  `;

  const { data } = useQuery(query);

  if (data) {
    response = data['CustomerUpdateById']['recordId'] ?? '';
  }
  
  return response;
}

export default {GetCustomers, GetCustomerById, UpdateCustomer};
