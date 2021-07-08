import Invoice from "./Invoice";
import Budget from "./Budget";
import User from "./User";
import Customer from "./Customer";
import Work from "./Work";

interface PdfInterface {
  type: String;
  invoice: Invoice;
  budget: Budget;
  work: Work;
  user: User;
  customer: Customer;
}

export default PdfInterface;
