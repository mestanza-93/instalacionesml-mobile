import Customer from "./Customer";

interface WorkInterface {
  _id: string;
  name: string;
  date: string;
  customer_id: string;
  action: string;
  customer: Customer;
}

export default WorkInterface;
