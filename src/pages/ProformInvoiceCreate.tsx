import React, { useState } from "react";
import { useParams } from "react-router";
import { IonContent } from "@ionic/react";

import Header from "../components/Header";
import ProformInvoiceForm from "../components/ProformInvoiceForm";
import HeaderInterface from "../interfaces/Header";
import FilterInterface from "../interfaces/Filters";
import ProformInvoiceInterface from "../interfaces/ProformInvoice";
import ParamsInterface from "../interfaces/UrlParams";
import ProformInvoiceModel from "../models/ProformInvoice";

const InvoiceCreate: React.FC = () => {
  /**
   * Invoice structure
   */

  let header = {} as HeaderInterface;
  header.title = "Nueva factura";

  let data = {} as ProformInvoiceInterface;
  data = { ...data };
  const [invoice] = useState(data);

  let params = {} as ParamsInterface;
  params = useParams() ?? {};

  let workId = params.id ?? null;
  
  /**
   * Get last invoice ID (MAX id)
   */
  let filters = {} as FilterInterface;
  filters.field = "year";
  filters.fieldValue = new Date().getFullYear();
  filters.fieldType = Number;
  filters.sort = "INVOICE_ID_DESC";
  filters.limit = 1;

  const lastInvoice = ProformInvoiceModel.GetInvoices(filters) ?? {};

  if (Object.keys(lastInvoice).length > 0 && !invoice.invoice_id) {
    invoice.action = 'create';
    invoice.work_id = workId;
    invoice.year = new Date().getFullYear();

    if (lastInvoice.invoices[0] && lastInvoice.invoices[0].invoice_id) {
      invoice.invoice_id = lastInvoice.invoices[0].invoice_id + 1;
    } else {
      invoice.invoice_id = 1;
    }
  }
 

  return (
    <IonContent>
      <Header {...header}></Header>
      <ProformInvoiceForm {...invoice}></ProformInvoiceForm>
    </IonContent>
  );
};

export default InvoiceCreate;
