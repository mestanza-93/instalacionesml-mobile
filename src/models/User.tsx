import { gql, useQuery } from "@apollo/client";

const GetUser = () => {
    let user = [];
  
    const query = gql`
      {
        UserOne {
          _id
          name
          lastname
          address
          town
          province
          country
          postalcode
          dni
          phone
          email
          iban
        }
      }
    `;
  
    const { data } = useQuery(query);
  
    if (data) {
      user = data["UserOne"] ?? [];
    }
  
    return user;
}


const UpdateUser = () => {

    const query = gql`
      mutation UserUpdateById(
        $_id: String!,
        $name: String,
        $lastname: String,
        $address: String,
        $town: String,
        $province: String,
        $country: String,
        $postalcode: Float,
        $dni: String,
        $phone: Float,
        $email: String,
        $iban: String
      ) {
        UserUpdateById(
          _id: $_id,
          record: {
            name: $name,
            lastname: $lastname,
            address: $address,
            town: $town,
            province: $province,
            country: $country:,
            postalcode: $postalcode,
            dni: $dni,
            phone: $phone,
            email: $email,
            iban: $iban
          }
        ) {
          record {
            _id
            name
            lastname
            address
            town
            province
            country
            postalcode
            dni
            phone
            email
            iban
          }
        }
      }
    `;
  
    return query;
  };


export default {
    GetUser,
    UpdateUser
}