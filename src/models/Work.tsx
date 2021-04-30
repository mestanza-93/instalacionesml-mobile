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


const GetWorkById = (id: string) => {
  let work = [];
  let queryId = ModelHelper.FilterId(id);

  const query = gql`
    {
      WorkById ${queryId} {
        _id
        name
        date
        customer_id
        updated_at
      }
    }
  `;

  const { data } = useQuery(query);

  if (data) {
    work = data["WorkById"] ?? [];
  }

  return work;
};


const CreateWork = () => {

  const query = gql`
    mutation WorkCreateOne(
      $name: String,
      $lastname: String,
      $customer_id: String,
    ) {
      WorkCreateOne(
        record: {
          name: $name,
          lastname: $lastname,
          customer_id: $customer_id,
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


const UpdateWork = () => {

  const query = gql`
    mutation WorkUpdateById(
      $_id: String!,
      $name: String,
      $date: String,
    ) {
      WorkUpdateById(
        _id: $_id,
        record: {
          name: $name,
          date: $date,
        }
      ) {
        record {
          _id
          name
          date
        }
      }
    }
  `;

  return query;
};


export default { 
  GetCustomerWorks, 
  GetWorkById, 
  CreateWork, 
  UpdateWork 
};