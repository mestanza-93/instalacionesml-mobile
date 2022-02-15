import { gql, useQuery } from "@apollo/client";
import ModelHelper from "../helpers/ModelHelper";
import FilterInterface from "../interfaces/Filters";
import InvoiceListInterface from "../interfaces/InvoiceList";

const GetInvoiceById = (id: string, all: boolean) => {
  let invoice = [];
  let queryId = ModelHelper.FilterId(id);

  let extraQuery = "";

  if (all) {
    extraQuery = `work {
      _id
      name
      date
      customer_id
      updated_at
      customer {
        name
        lastname
        phone
        dni
        address
        postalcode
        town
        updated_at
      }
    }`;
  }

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
        ${extraQuery}
      }
    }
  `;

  const { data } = useQuery(query);

  if (data) {
    invoice = data["InvoiceById"] ?? [];
  }

  return invoice;
};


const GetInvoices = (filters: FilterInterface) => {
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
      $invoice_id: Float,
      $work_id: String,
      $iva: Float,
      $date: Date,
      $year: Float,
      $payment: Float,
      $comment: String,
      $concepts: [ConceptInput]
    ) {
      InvoiceCreateOne(
        record: {
          invoice_id: $invoice_id,
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
    }
  `;

  return query;
};


const UpdateInvoice = () => {

  const query = gql`
    mutation InvoiceUpdateById(
      $_id: String!,
      $invoice_id: Float,
      $work_id: String,
      $iva: Float,
      $date: Date,
      $year: Float,
      $payment: Float,
      $comment: String,
      $concepts: [UpdateByIdConceptInput]
    ) {
      InvoiceUpdateById(
        _id: $_id,
        record: {
          invoice_id: $invoice_id,
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
    }
  `;

  return query;
};

const DeleteInvoice = () => {

  const query = gql`
    mutation InvoiceRemoveById(
      $_id: String!,
    ) {
      InvoiceRemoveById(
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
  GetInvoices,
  CreateInvoice,
  UpdateInvoice,
  DeleteInvoice
};
