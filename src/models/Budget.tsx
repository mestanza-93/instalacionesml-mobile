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


const CreateBudget = () => {

  const query = gql`
    mutation BudgetCreateOne(
      $budget_id: Float,
      $work_id: String,
      $iva: Float,
      $date: Date,
      $year: Float,
      $payment: Float,
      $comment: String,
      $concepts: [ConceptInput]
    ) {
      BudgetCreateOne(
        record: {
          budget_id: $budget_id,
          work_id: $work_id,
          iva: $iva,
          date: $date,
          year: $year,
          payment: $payment,
          comment: $comment,
          concepts: $concepts
        }
      ) {
        record {
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
    }
  `;

  return query;
};


const UpdateBudget = () => {

  const query = gql`
    mutation BudgetUpdateById(
      $_id: String!,
      $budget_id: Float,
      $work_id: String,
      $iva: Float,
      $date: Date,
      $year: Float,
      $payment: Float,
      $comment: String,
      $concepts: [UpdateByIdConceptInput]
    ) {
      BudgetUpdateById(
        _id: $_id,
        record: {
          budget_id: $budget_id,
          work_id: $work_id,
          iva: $iva,
          date: $date,
          year: $year,
          payment: $payment,
          comment: $comment,
          concepts: $concepts
        }
      ) {
        record {
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
    }
  `;

  return query;
};

const DeleteBudget = () => {

  const query = gql`
    mutation BudgetRemoveById(
      $_id: String!,
    ) {
      BudgetRemoveById(
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
  GetBudgetById,
  GetBudgets,
  CreateBudget,
  UpdateBudget,
  DeleteBudget
};
