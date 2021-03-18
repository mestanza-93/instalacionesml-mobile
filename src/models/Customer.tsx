import { gql, useQuery } from "@apollo/client";

const GetCustomers = (limit: Number, order: {}) => {

  var limitQuery = limit ? `(limit: ${limit})` : '';

  const query = gql`
    {
      CustomerMany ${limitQuery} {
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
