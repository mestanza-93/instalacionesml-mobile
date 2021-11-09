import { IonContent, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { folderOutline } from "ionicons/icons";
import React from "react";
import FormatHelper from "../helpers/FormatHelper";
import UrlHelper from "../helpers/UrlHelper";
import ProformInvoiceListInterface from "../interfaces/ProformInvoiceList";

const InvoiceList: React.FC<ProformInvoiceListInterface> = (props) => {

  let invoices = props.invoices;

  return (
    <IonContent>
     <IonList>
        {invoices && invoices.length > 0
          ? invoices.map((invoice: any) => (
              <IonItem href={UrlHelper.MakeUrl("proform-invoice", invoice._id)}>
                <IonIcon icon={folderOutline} slot="start" />
                <IonLabel>
                  <h2>Factura proforma {FormatHelper.PrintInvoiceTitle(invoice.year, invoice.invoice_id)}</h2>
                  <p>{invoice.date ? FormatHelper.FormatDate(invoice.date) : ""}</p>
                </IonLabel>
              </IonItem>
            ))
          : ""}
      </IonList>
    </IonContent>
  );
};

export default InvoiceList;
