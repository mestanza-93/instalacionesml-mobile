import Invoice from "./Invoice";
import Budget from "./Budget";
import User from "./User";

interface PdfInterface {
  type: String;
  invoice: Invoice;
  budget: Budget;
  user: User;
}

export default PdfInterface;
