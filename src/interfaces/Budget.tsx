import Concept from "./Concept";

interface BudgetInterface {
  _id: string;
  budget_id: number;
  work_id: string;
  iva: number;
  date: string;
  year: number;
  payment: number;
  comment: string;
  concepts: [Concept];
  action: string;
}

export default BudgetInterface;
