import { gql, useQuery } from "@apollo/client";
import ModelHelper from "../helpers/ModelHelper";
import FilterInterface from "../interfaces/Filters";
import BudgetListInterface from "../interfaces/BudgetList";

const GetBudgetById = (id: string) => {
  let budget = [];
  let queryId = ModelHelper.FilterId(id);

  const query = gql`
    {
      BudgetById ${queryId} {
        _id
        budget_id
        work_id
        iva
        date
        year
        payment
        comment
        concepts {
          concept
          base
          units
        }
      }
    }
  `;

  const { data } = useQuery(query);

  if (data) {
    budget = data["BudgetById"] ?? [];
  }

  return budget;
};

const GetBudgets = (filters: FilterInterface) => {
  let result = {} as BudgetListInterface;
  let filtersQuery = ModelHelper.GetFilters(filters);

  const query = gql`
    {
        BudgetMany ${filtersQuery} {
        _id
        budget_id
        work_id
        iva
        date
        year
        payment
        comment
        concepts {
          concept
          base
          units
        }
      }
    }
  `;

  const { data } = useQuery(query);

  if (data) {
    result.budgets = data["BudgetMany"] ?? [];
  }

  return result;
};

export default {
  GetBudgetById,
  GetBudgets,
};
