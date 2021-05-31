import { gql, useQuery } from "@apollo/client";
import ModelHelper from "../helpers/ModelHelper";
import FilterInterface from "../interfaces/Filters";
import InvoiceListInterface from "../interfaces/InvoiceList";

const GetInvoiceById = (id: string) => {
  let invoice = [];
  let queryId = ModelHelper.FilterId(id);

  const query = gql`
    {
      InvoiceById ${queryId} {
        _id
        invoice_id
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
    invoice = data["InvoiceById"] ?? [];
  }

  return invoice;
};

const GetLastInvoices = (filters: FilterInterface) => {
  let result = {} as InvoiceListInterface;
  let filtersQuery = ModelHelper.GetFilters(filters);

  const query = gql`
    {
      InvoiceMany ${filtersQuery} {
        _id
        invoice_id
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
    result.invoices = data["InvoiceMany"] ?? [];
  }

  return result;
};


const CreateInvoice = () => {

  const query = gql`
    mutation InvoiceCreateOne(
      $name: String,
      $date: Date,
      $customer_id: String,
    ) {
      WorkCreateOne(
        record: {
          name: $name,
          date: $date,
          customer_id: $customer_id,
        }
      ) {
        record {
          _id
        }
      }
    }
  `;

  return query;
};


const UpdateInvoice = () => {

  const query = gql`
    mutation InvoiceUpdateById(
      $_id: String!,
      $name: String,
      $date: Date,
    ) {
      WorkUpdateById(
        _id: $_id,
        record: {
          name: $name,
          date: $date,
        }
      ) {
        record {
          _id
          name
          date
        }
      }
    }
  `;

  return query;
};

const DeleteInvoice = () => {

  const query = gql`
    mutation InvoiceRemoveById(
      $_id: String!,
    ) {
      WorkRemoveById(
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
  GetInvoiceById,
  GetLastInvoices,
  CreateInvoice,
  UpdateInvoice,
  DeleteInvoice
};
