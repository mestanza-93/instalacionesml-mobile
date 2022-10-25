import React, { useState } from "react";
import { IonContent } from "@ionic/react";
import FilterInterface from "../interfaces/Filters";
import Header from "../components/Header";
import HeaderInterface from "../interfaces/Header";
import ProformInvoiceListInterface from "../interfaces/ProformInvoiceList";
import ProformInvoiceList from "../components/ProformInvoiceList";
import ProformInvoiceModel from "../models/ProformInvoice";

const Invoices: React.FC = () => {
  let header = {} as HeaderInterface;
  header.title = "Últimas Proformas";
  
  let data = {} as ProformInvoiceListInterface;

  /**
   * Last invoices
   */
  let filters = {} as FilterInterface;
  filters.sort = "DATE_DESC";
  filters.limit = 100;

  const [invoices, setInvoices] = useState(data);
  data = ProformInvoiceModel.GetInvoices(filters) ?? {};

  /**
   * Initialize list data
   */
  if (Object.keys(data).length > 0 && Object.keys(invoices).length === 0) {
    setInvoices(data);
  }

  return (
    <IonContent>
      <Header {...header}></Header>
      <ProformInvoiceList {...invoices}></ProformInvoiceList>
    </IonContent>
  );
};

export default Invoices;
