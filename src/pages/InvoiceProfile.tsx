import React, { useState } from "react";
import { IonContent } from "@ionic/react";
import { useParams } from "react-router";
import Header from "../components/Header";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceInterface from "../interfaces/Invoice";
import ParamsInterface from "../interfaces/UrlParams";
import InvoiceModel from "../models/Invoice";
import HeaderInterface from "../interfaces/Header";
import UrlHelper from "../helpers/UrlHelper";


const InvoiceProfile: React.FC = () => {
  /**
   * Invoice data
   */
   let header = {} as HeaderInterface;
   header.title = "Factura";
   header.backName = "Trabajo";
   
   let data = {} as InvoiceInterface;
   let params = {} as ParamsInterface;
   params = useParams() ?? {};
 
   let id = params.id ?? null;
   const [invoice, setInvoice] = useState(data);
   data = id ? InvoiceModel.GetInvoiceById(id) ?? {} : {};
 
   header.backUrl = UrlHelper.MakeUrl('work', data.work_id);

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
       <InvoiceForm {...invoice}></InvoiceForm>
     </IonContent>
   );
};

export default InvoiceProfile;
