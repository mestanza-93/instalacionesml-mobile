import {
  IonContent,
  IonDatetime,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea,
  useIonAlert,
} from "@ionic/react";

import { useForm } from "react-hook-form";
import InvoiceModel from "../models/Invoice";
import InvoiceInterface from "../interfaces/Invoice";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import UrlHelper from "../helpers/UrlHelper";
import {
  documentTextOutline,
  calendarNumberOutline,
  cashOutline,
  walletOutline,
  listOutline,
} from "ionicons/icons";
import FormatHelper from "../helpers/FormatHelper";
import "../theme/invoice.css";

const InvoiceForm: React.FC<InvoiceInterface> = (props) => {
  const buttonTitle = props.action == "edit" ? "Editar" : "Crear";
  const alertText =
    props.action == "edit"
      ? "No se ha podido editar el cliente"
      : "No se ha podido crear el cliente";

  /**
   * Form control
   */
  const { handleSubmit, setValue } = useForm<InvoiceInterface>({
    defaultValues: { ...props },
    mode: "onSubmit",
  });

  /**
   * Initialize invoice fields if exists
   */
  const [invoice, setInvoice] = useState({} as InvoiceInterface);
  if (Object.keys(props).length > 0 && Object.keys(invoice).length === 0) {
    setInvoice(props);
  }

  /**
   * Handler invoice actions
   */
  const [showAlert, setShowAlert] = useState(false);
  const [confirm] = useIonAlert();

  const [updateHandler] = useMutation(InvoiceModel.UpdateInvoice(), {
    onCompleted: (response) => {
      let invoiceResult = response.InvoiceUpdateById.record ?? {};
      setInvoice(invoiceResult);
    },
  });

  const [createHandler] = useMutation(InvoiceModel.CreateInvoice(), {
    onCompleted: (response) => {
      let newID = response.InvoiceCreateOne.record._id ?? null;
      if (newID) {
        window.location.href = `/invoice/${newID}`;
      } else {
        setShowAlert(true);
      }
    },
  });

  const onSubmit = handleSubmit((formData) => {
    if (props.action == "edit") {
      formData._id = invoice._id;
      updateHandler({ variables: formData });
    } else if (props.action == "create") {
      createHandler({ variables: formData });
    }
  });

  const [deleteHandler] = useMutation(InvoiceModel.DeleteInvoice(), {
    onCompleted: (response) => {
      let deletedID = response.InvoiceRemoveById ?? null;
      if (deletedID) {
        window.location.href = UrlHelper.MakeUrl("invoices");
      } else {
        setShowAlert(true);
      }
    },
  });

  const deleteInvoice = () => {
    deleteHandler({ variables: { _id: invoice._id } });
  };

  return (
    <form className="ion-padding" onSubmit={onSubmit}>
      <IonContent>
        <IonItem>
          <IonIcon slot="start" icon={documentTextOutline}></IonIcon>
          <IonLabel>
            Factura{" "}
            {FormatHelper.PrintInvoiceTitle(invoice.year, invoice.invoice_id) ??
              ""}
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonIcon slot="start" icon={calendarNumberOutline}></IonIcon>
          <IonDatetime
            displayFormat="DD-MM-YYYY HH:mm"
            value={invoice.date ?? ""}
            placeholder="Fecha"
            onIonChange={(e): void => {
              setValue("date", e.detail.value ?? "");
              setValue(
                "year",
                e.detail.value ? Number(e.detail.value.substring(0, 4)) : 0
              );
            }}
            cancelText="Cancelar"
            doneText="Aceptar"
          ></IonDatetime>
        </IonItem>

        <IonItem>
          <IonIcon slot="start" icon={cashOutline}></IonIcon>
          <IonInput
            value={invoice.iva ?? ""}
            placeholder="% IVA"
            onIonChange={(e): void => {
              setValue("iva", Number(e.detail.value ?? ""));
            }}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonIcon slot="start" icon={walletOutline}></IonIcon>
          <IonInput
            value={invoice.payment ?? ""}
            placeholder="Tipo de pago"
            onIonChange={(e): void => {
              setValue("payment", Number(e.detail.value) ?? "");
            }}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonIcon slot="start" icon={listOutline}></IonIcon>
          <IonTextarea
            rows={4}
            value={invoice.comment ?? ""}
            placeholder="Observaciones"
            onIonChange={(e): void => {
              setValue("comment", e.detail.value ?? "");
            }}
          ></IonTextarea>
        </IonItem>

        {invoice.concepts && invoice.concepts.length > 0 ? (
          <IonItem className="ion-text-center" lines="none" color="warning">
            <IonLabel>Conceptos</IonLabel>
          </IonItem>
        ) : (
          ""
        )}
        {invoice.concepts && invoice.concepts.length > 0 ? (
          <IonList>
            {invoice.concepts.map((concept: any) => (
              <IonItem>
                <IonIcon icon={listOutline} slot="start" />
                <IonTextarea
                  rows={3}
                  value={concept.concept ?? ""}
                  placeholder="Concepto"
                  onIonChange={(e): void => {
                    setValue("concepts.0.concept", e.detail.value ?? "");
                  }}
                ></IonTextarea>
                <IonItem>
                  <IonLabel>Base: </IonLabel>
                  <IonInput
                    value={invoice.payment ?? ""}
                    placeholder="Tipo de pago"
                    onIonChange={(e): void => {
                      setValue("payment", Number(e.detail.value) ?? "");
                    }}
                  ></IonInput>
                </IonItem>
              </IonItem>
            ))}
          </IonList>
        ) : (
          ""
        )}
      </IonContent>
    </form>
  );
};

export default InvoiceForm;
