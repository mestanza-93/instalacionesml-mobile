import { gql, useQuery } from "@apollo/client";
import ModelHelper from "../helpers/ModelHelper";
import WorkListInterface from "../interfaces/WorksList"

const GetCustomerWorks = (id: string) => {
  let result = {} as WorkListInterface;
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
    result.works = data["WorkMany"] ?? [];
  }

  return result;
};


export default { GetCustomerWorks };