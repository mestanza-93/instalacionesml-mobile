import Concept from "./Concept";
import Work from "./Work";

interface ProformInvoiceInterface {
  _id: string;
  invoice_id: number;
  work_id: string;
  iva: number;
  date: string;
  year: number;
  payment: number;
  comment: string;
  action: string;
  sum_iva: number;
  sum_base: number;
  total: number;
  concepts: [Concept];
  work: Work;
}

export default ProformInvoiceInterface;
