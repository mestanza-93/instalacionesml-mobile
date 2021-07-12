import Concept from "./Concept";
import Work from "./Work";

interface BudgetInterface {
  _id: string;
  budget_id: number;
  work_id: string;
  iva: number;
  date: string;
  year: number;
  payment: number;
  comment: string;
  sum_iva: number;
  sum_base: number;
  total: number;
  concepts: [Concept];
  action: string;
  work: Work;
}

export default BudgetInterface;
