import { gql, useQuery } from "@apollo/client";
import ModelHelper from "../helpers/ModelHelper";

const GetCustomerWorks = (id: string) => {
  let works = [];
  let filter = ModelHelper.FilterField(id, "customer_id");

  const query = gql`
      {
        WorkMany ${filter} {
          _id
          name
          date
        }
      }
    `;

  const { data } = useQuery(query);

  if (data) {
    works = data["WorkMany"] ?? [];
  }

  return works;
};


export default { GetCustomerWorks };