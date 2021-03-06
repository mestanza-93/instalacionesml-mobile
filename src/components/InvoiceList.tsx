import { IonContent, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { folderOutline } from "ionicons/icons";
import React from "react";
import FormatHelper from "../helpers/FormatHelper";
import UrlHelper from "../helpers/UrlHelper";
import InvoiceListInterface from "../interfaces/InvoiceList";

const InvoiceList: React.FC<InvoiceListInterface> = (props) => {

  let invoices = props.invoices;

  return (
    <IonContent>
     <IonList>
        {invoices && invoices.length > 0
          ? invoices.map((invoice: any) => (
              <IonItem href={UrlHelper.MakeUrl("invoice", invoice._id)}>
                <IonIcon icon={folderOutline} slot="start" />
                <IonLabel>
                  <h2>Factura {FormatHelper.PrintInvoiceTitle(invoice.year, invoice.invoice_id)}</h2>
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
