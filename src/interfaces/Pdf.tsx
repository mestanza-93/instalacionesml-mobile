import Invoice from "./Invoice";
import Budget from "./Budget";
import User from "./User";
import Customer from "./Customer";

interface PdfInterface {
  type: String;
  invoice: Invoice;
  budget: Budget;
  user: User;
  customer: Customer;
}

export default PdfInterface;
