import { gql, useQuery } from "@apollo/client";
import ModelHelper from "../helpers/ModelHelper";
import WorkListInterface from "../interfaces/WorksList";
import FilterInterface from "../interfaces/Filters";


const GetCustomerWorks = (filters: FilterInterface) => {
  let result = {} as WorkListInterface;

  let filtersQuery = ModelHelper.GetFilters(filters);

  const query = gql`
      {
        WorkMany ${filtersQuery} {
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


const GetLastWorks = (filters: FilterInterface) => {
  let result = {} as WorkListInterface;
  let filtersQuery = ModelHelper.GetFilters(filters);

  const query = gql`
    {
      WorkMany ${filtersQuery} {
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
    result.works = data["WorkMany"] ?? [];
  }

  return result;
};


const CreateWork = () => {

  const query = gql`
    mutation WorkCreateOne(
      $name: String,
      $date: Date,
      $customer_id: String,
    ) {
      WorkCreateOne(
        record: {
          name: $name,
          date: $date,
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
      $date: Date,
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

const DeleteWork = () => {

  const query = gql`
    mutation WorkRemoveById(
      $_id: String!,
    ) {
      WorkRemoveById(
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
  GetCustomerWorks, 
  GetWorkById, 
  CreateWork, 
  UpdateWork,
  DeleteWork,
  GetLastWorks
};