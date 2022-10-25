import React, { useState } from "react";
import { IonContent } from "@ionic/react";
import FilterInterface from "../interfaces/Filters";
import Header from "../components/Header";
import HeaderInterface from "../interfaces/Header";
import InvoiceListInterface from "../interfaces/InvoiceList";
import InvoiceList from "../components/InvoiceList";
import InvoiceModel from "../models/Invoice";

const Invoices: React.FC = () => {
  let header = {} as HeaderInterface;
  header.title = "Últimas facturas";
  
  let data = {} as InvoiceListInterface;

  /**
   * Last invoices
   */
  let filters = {} as FilterInterface;
  filters.sort = "DATE_DESC";
  filters.limit = 100;

  const [invoices, setInvoices] = useState(data);
  data = InvoiceModel.GetInvoices(filters) ?? {};

  /**
   * Initialize list data
   */
  if (Object.keys(data).length > 0 && Object.keys(invoices).length === 0) {
    setInvoices(data);
  }

  return (
    <IonContent>
      <Header {...header}></Header>
      <InvoiceList {...invoices}></InvoiceList>
    </IonContent>
  );
};

export default Invoices;
