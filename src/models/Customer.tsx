import { gql, useMutation, useQuery } from "@apollo/client";
import ModelHelper from "../helpers/ModelHelper";
import CustomerInterface from "../interfaces/Customer";

const GetCustomers = (limit: Number, sort: String) => {
  var filters = {
    limit: limit,
    sort: sort,
  };

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
    customers = data["CustomerMany"] ?? [];
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
    customer = data["CustomerById"] ?? [];
  }

  return customer;
};

const UpdateCustomer = (customer: CustomerInterface) => {
  let response = "";

  console.log(customer);

  // const query = gql`
  //   mutation {
  //     CustomerUpdateById(_id: "${customer._id}",
  //       record: {
  //         name: "${customer.name}",
  //         lastname: "${customer.lastname}",
  //         phone: ${customer.phone},
  //         phone2: ${customer.phone2},
  //         dni: "${customer.dni}",
  //         email: "${customer.email}",
  //         postalcode: ${customer.postalcode},
  //         address: "${customer.address}",
  //         town: "${customer.town}"
  //       }
  //     ) {
  //       recordId
  //     }
  //   }
  // `;

  const query = gql`
    mutation CustomerUpdateById(
      $_id: String!
      $name: String
      $lastname: String
      $phone: Int
      $phone2: String
      $dni: String
      $email: String
      $postalcode: Int
      $address: String
      $town: String
    ) {
      CustomerUpdateById(
        where: { _id: { _eq: $_id } }
        _set: {
          name: $name
          lastname: $lastname
          phone: $phone
          phone2: $phone2
          dni: $dni
          email: $email
          postalcode: $postalcode
          address: $address
          town: $town
        }
      )
    }
  `;

  console.log("Query: " + query);

  const [
    updateCustomer,
    { loading: updating, error: updateError },
  ] = useMutation(query);

  updateCustomer({
    variables: {
      _id: customer._id,
      name: customer.name,
      lastname: customer.lastname,
      phone: customer.phone,
      phone2: customer.phone2,
      dni: customer.dni,
      email: customer.email,
      postalcode: customer.postalcode,
      address: customer.address,
      town: customer.town,
    },
  });

  console.log("UPDATE CUSTOMER: " + updateCustomer);

  return response;
};

export default { GetCustomers, GetCustomerById, UpdateCustomer };
