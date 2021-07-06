import React, { useState } from "react";
import { useParams } from "react-router";
import Pdf from "../components/Pdf";
import PdfInterface from "../interfaces/Pdf";
import ParamsInterface from "../interfaces/UrlParams";
import UserModel from "../models/User";
import InvoiceModel from "../models/Invoice";
import UserInterface from "../interfaces/User";
import InvoiceInterface from "../interfaces/Invoice";

const InvoicePdf: React.FC = () => {
  let params = {} as ParamsInterface;
  let data = {} as PdfInterface;
  let userData = {} as UserInterface;
  let invoiceData = {} as InvoiceInterface;
  
  data.type = "invoice";
  params = useParams() ?? {};

  const [pdf, setPdf] = useState(data);

  const [user, setUser] = useState(userData);
  userData = UserModel.GetUser() ?? {};


  let id = params.id ?? null;
  const [invoice, setInvoice] = useState(invoiceData);
  invoiceData = id ? InvoiceModel.GetInvoiceById(id, true) ?? {} : {};

  /**
   * Initialize user data
   */
   if (Object.keys(userData).length > 0 && Object.keys(user).length === 0) {
    setUser(userData);
    pdf.user = userData;
  }

  /**
   * Initialize invoice data
   */
   if (Object.keys(invoiceData).length > 0 && Object.keys(invoice).length === 0) {

    let invoiceAux = {...invoiceData};

    invoiceAux.sum_base = 0;
    invoiceAux.sum_iva = 0;
    invoiceAux.total = 0;

    invoiceAux.concepts.map((concept: any, index: number) => {
      let sum_base = concept.base * concept.units;
      let sum_iva = ((invoiceAux.iva * concept.base * concept.units) / 100);

      invoiceAux.sum_base += sum_base;
      invoiceAux.sum_iva += sum_iva;

      invoiceAux.total += (sum_base + sum_iva);
    });

    invoiceAux.sum_base = parseFloat(invoiceAux.sum_base.toFixed(2));
    invoiceAux.sum_iva = parseFloat(invoiceAux.sum_iva.toFixed(2));
    invoiceAux.total = parseFloat(invoiceAux.total.toFixed(2));
      
    setInvoice(invoiceAux);
    pdf.invoice = invoiceAux;
    pdf.customer = invoiceAux.work.customer ?? {};
  }

  return <Pdf {...pdf}></Pdf>;
};

export default InvoicePdf;
