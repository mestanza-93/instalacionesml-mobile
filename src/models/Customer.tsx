import { gql, useQuery } from "@apollo/client";
import ModelHelper from "../helpers/ModelHelper";
import FilterInterface from "../interfaces/Filters";

const GetCustomers = (filters: FilterInterface) => {

  let filtersQuery = ModelHelper.GetFilters(filters);

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
    customers = data["CustomerMany"] ?? [];
  }

  return customers;
};

const GetCustomerById = (id: string, works: Boolean) => {
  let customer = [];
  let queryId = ModelHelper.FilterId(id);

  let worksQuery = works ? 
    `works (sort: DATE_DESC) {
        _id
        name
        date
      }
    ` : '';

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
        ${worksQuery}
      }
    }
  `;

  const { data } = useQuery(query);

  if (data) {
    customer = data["CustomerById"] ?? [];
  }

  return customer;
};

const UpdateCustomer = () => {

  const query = gql`
    mutation CustomerUpdateById(
      $_id: String!,
      $name: String,
      $lastname: String,
      $phone: Float,
      $phone2: Float,
      $dni: String,
      $email: String,
      $postalcode: Float,
      $address: String,
      $town: String
    ) {
      CustomerUpdateById(
        _id: $_id,
        record: {
          name: $name,
          lastname: $lastname,
          phone: $phone,
          phone2: $phone2,
          dni: $dni,
          email: $email,
          postalcode: $postalcode,
          address: $address,
          town: $town
        }
      ) {
        record {
          _id
          name
          lastname
          phone
          phone2
          dni
          email
          postalcode
          address
          town
        }
      }
    }
  `;

  return query;
};

const CreateCustomer = () => {

  const query = gql`
    mutation CustomerCreateOne(
      $name: String,
      $lastname: String,
      $phone: Float,
      $phone2: Float,
      $dni: String,
      $email: String,
      $postalcode: Float,
      $address: String,
      $town: String
    ) {
      CustomerCreateOne(
        record: {
          name: $name,
          lastname: $lastname,
          phone: $phone,
          phone2: $phone2,
          dni: $dni,
          email: $email,
          postalcode: $postalcode,
          address: $address,
          town: $town
        }
      ) {
        record {
          _id
        }
      }
    }
  `;

  return query;
};

const DeleteCustomer = () => {

  const query = gql`
    mutation CustomerRemoveById(
      $_id: String!,
    ) {
      CustomerRemoveById(
        _id: $_id
      ) {
        record {
          _id
        }
      }
    }
  `;
  
  return query;
};


export default {
  GetCustomers,
  GetCustomerById,
  UpdateCustomer,
  CreateCustomer,
  DeleteCustomer
};
