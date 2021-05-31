import Concept from "./Concept";

interface InvoiceInterface {
  _id: string;
  invoice_id: number;
  work_id: string;
  iva: number;
  date: string;
  year: number;
  payment: number;
  comment: string;
  concepts: [Concept];
  action: string;
}

export default InvoiceInterface;
