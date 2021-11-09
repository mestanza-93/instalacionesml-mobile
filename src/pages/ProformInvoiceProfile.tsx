import React, { useState } from "react";
import { IonContent } from "@ionic/react";
import { useParams } from "react-router";
import Header from "../components/Header";
import ProformInvoiceForm from "../components/ProformInvoiceForm";
import ProformInvoiceInterface from "../interfaces/ProformInvoice";
import ParamsInterface from "../interfaces/UrlParams";
import HeaderInterface from "../interfaces/Header";
import ProformInvoiceModel from "../models/ProformInvoice";
import UrlHelper from "../helpers/UrlHelper";

const InvoiceProfile: React.FC = () => {
  /**
   * Invoice data
   */
  let header = {} as HeaderInterface;
  header.title = "Factura proforma";
  header.backName = "Trabajo";

  let data = {} as ProformInvoiceInterface;
  let params = {} as ParamsInterface;
  params = useParams() ?? {};

  let id = params.id ?? null;
  const [invoice, setInvoice] = useState(data);
  data = id ? ProformInvoiceModel.GetInvoiceById(id, false) ?? {} : {};

  header.backUrl = UrlHelper.MakeUrl("work", data.work_id);

  /**
   * Initialize form data
   */
  if (Object.keys(data).length > 0 && Object.keys(invoice).length === 0) {
    data = { ...data, ...{ action: "edit" } };
    setInvoice(data);
  }

  return (
    <IonContent>
      <Header {...header}></Header>
      <ProformInvoiceForm {...invoice}></ProformInvoiceForm>
    </IonContent>
  );
};

export default InvoiceProfile;
