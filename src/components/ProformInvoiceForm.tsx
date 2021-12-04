import {
    IonAlert,
    IonButton,
    IonCard,
    IonCol,
    IonDatetime,
    IonFab,
    IonFabButton,
    IonGrid,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonPopover,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonTitle,
    IonToolbar,
    useIonAlert,
  } from "@ionic/react";
  
  import {
    documentTextOutline,
    calendarNumberOutline,
    cashOutline,
    walletOutline,
    listOutline,
    closeOutline,
  } from "ionicons/icons";
  import "../theme/invoice.css";
  
  import React, { useState } from "react";
  import { useMutation } from "@apollo/client";
  import { useForm } from "react-hook-form";
  import ProformInvoiceModel from "../models/ProformInvoice";
  import ProformInvoiceInterface from "../interfaces/ProformInvoice";
  import UrlHelper from "../helpers/UrlHelper";
  import ConceptInterface from "../interfaces/Concept";
  import Footer from "../components/Footer";
  import ProformInvoicePDF from "../pages/ProformInvoicePdf";
  
  const InvoiceForm: React.FC<ProformInvoiceInterface> = (props) => {
    const buttonTitle = props.action == "edit" ? "Guardar" : "Crear";
    const alertText =
      props.action == "edit"
        ? "No se ha podido editar la factura"
        : "No se ha podido crear la factura";
  
    /**
     * Form control
     */
    const { handleSubmit, setValue } = useForm<ProformInvoiceInterface>({
      defaultValues: { ...props },
      mode: "onSubmit",
    });
  
    /**
     * Initialize invoice fields if exists
     */
    const [invoice, setInvoice] = useState({} as ProformInvoiceInterface);
    if (Object.keys(props).length > 0 && Object.keys(invoice).length === 0) {
      setInvoice(props);
    }
  
    /**
     * Concepts modal
     */
    const [popoverState, setShowPopover] = useState({
      showPopover: false,
      event: undefined,
    });
  
    /**
     * Handler invoice actions
     */
    const [renderPDF, setRenderPDF] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [confirm] = useIonAlert();
  
    const [updateHandler] = useMutation(ProformInvoiceModel.UpdateInvoice(), {
      onCompleted: (response) => {
        let invoiceResult = response.ProformInvoiceUpdateById.record ?? {};
        setInvoice(invoiceResult);
      },
    });
  
    const [createHandler] = useMutation(ProformInvoiceModel.CreateInvoice(), {
      onCompleted: (response) => {
        let newID = response.ProformInvoiceCreateOne.record._id ?? null;
        if (newID) {
          window.location.href = `/proform-invoice/${newID}`;
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
        formData.work_id = invoice.work_id;
        formData.invoice_id = invoice.invoice_id;
        formData.concepts = invoice.concepts;
        formData.year = invoice.year;
  
        createHandler({ variables: formData });
      }
    });
  
    const [deleteHandler] = useMutation(ProformInvoiceModel.DeleteInvoice(), {
      onCompleted: (response) => {
        let deletedID = response.ProformInvoiceRemoveById ?? null;
        if (deletedID) {
          window.location.href = UrlHelper.MakeUrl("proform-invoices");
        } else {
          setShowAlert(true);
        }
      },
    });
  
    const deleteInvoice = () => {
      deleteHandler({ variables: { _id: invoice._id } });
    };
  
    /**
     * New concept
     */
  
    const [newConcept, setNewConcept] = useState({} as ConceptInterface);
    const [auxConcept] = useState({} as ConceptInterface);
  
    const addConcept = (variable: string, value: any) => {
      if (variable == "concept") {
        auxConcept.concept = value ?? "";
      } else if (variable == "units") {
        auxConcept.units = Number(value) ?? "";
      } else if (variable == "base") {
        auxConcept.base = Number(value ? value.replace("€", "") : "");
      }
  
      setNewConcept(auxConcept);
    };
  
    const pushConcept = () => {
      const newConcepts = invoice.concepts
        ? JSON.parse(JSON.stringify(invoice.concepts))
        : [];
      let index = newConcepts.lastIndexOf(newConcepts.slice(-1)[0]) ?? 0;
  
      if (!newConcepts[index + 1]) {
        newConcepts[index + 1] = newConcept;
      }
  
      setValue("concepts", newConcepts);
      setNewConcept({} as ConceptInterface);
    };
  
    return (
      <div>
        <form className="ion-padding" onSubmit={onSubmit}>
          <IonItem>
            <IonIcon slot="start" icon={documentTextOutline}></IonIcon>
            <IonLabel>
              Factura proforma
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
              type="number"
              value={invoice.iva ?? ""}
              placeholder="% IVA"
              onIonChange={(e): void => {
                setValue("iva", e.detail.value ? Number(e.detail.value) : 21);
              }}
            ></IonInput>
          </IonItem>
  
          <IonItem>
            <IonIcon slot="start" icon={walletOutline}></IonIcon>
            <IonSelect
              value={invoice.payment ?? ""}
              placeholder="Pago"
              onIonChange={(e) =>
                setValue("payment", Number(e.detail.value) ?? "")
              }
              okText="Aceptar"
              cancelText="Cancelar"
            >
              <IonLabel>Pago</IonLabel>
              <IonSelectOption key={1} value={1}>
                Efectivo
              </IonSelectOption>
              <IonSelectOption key={2} value={2}>
                Transferencia
              </IonSelectOption>
            </IonSelect>
          </IonItem>
  
          <IonItem lines="none">
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
  
          <IonItem className="ion-text-center" lines="none">
            <IonLabel>
              <IonButton
                className="ion-margin-top customer-edit-button"
                color="warning"
                type="submit"
              >
                {buttonTitle}
              </IonButton>
            </IonLabel>
            {props.action == "edit" ? (
              <IonLabel>
                <IonButton
                  className="ion-margin-top customer-delete-button"
                  color="danger"
                  onClick={() =>
                    confirm({
                      header: "Eliminar factura",
                      message: "¿Estás seguro?",
                      buttons: [
                        "Cancelar",
                        { text: "Confirmar", handler: (d) => deleteInvoice() },
                      ],
                    })
                  }
                >
                  Borrar
                </IonButton>
              </IonLabel>
            ) : (
              ""
            )}
            {props.action == "edit" ? (
              <IonLabel>
                <IonButton
                  className="ion-margin-top customer-delete-button"
                  color="success"
                  onClick={() => {
                    setRenderPDF(true);
                  }}
                >
                  PDF
                </IonButton>
              </IonLabel>
            ) : (
              ""
            )}
          </IonItem>


        {props.action == "edit" ? (
          <IonItem className="ion-text-center" lines="none">
            <IonLabel>
              <IonButton
                className="customer-delete-button"
                color="secondary"
                onClick={(e: any) => {
                  e.persist();
                  setShowPopover({ showPopover: true, event: e });
                }}
              >
                Añadir Concepto
              </IonButton>
            </IonLabel>
          </IonItem>
        ) : (
          ""
        )}
  
          {invoice.concepts && invoice.concepts.length > 0 ? (
            <IonItem className="ion-text-center" lines="none" color="primary">
              <IonLabel>Conceptos</IonLabel>
            </IonItem>
          ) : (
            ""
          )}
          {invoice.concepts && invoice.concepts.length > 0
            ? invoice.concepts.map((concept: any, index: number) => (
                <IonCard>
                  <IonGrid>
                    <IonRow>
                      <IonCol size="10">
                        <IonItem className="concept-text">
                          <IonTextarea
                            rows={4}
                            value={concept.concept ?? ""}
                            placeholder="Concepto"
                            onIonChange={(e): void => {
                              const newConcepts = JSON.parse(
                                JSON.stringify(invoice.concepts)
                              );
                              newConcepts[index].concept = e.detail.value ?? "";
                              setValue("concepts", newConcepts);
                            }}
                          ></IonTextarea>
                        </IonItem>
                      </IonCol>
                      <IonCol size="2">
                        <IonFab vertical="top" horizontal="end">
                          <IonFabButton
                            size="small"
                            color="light"
                            onClick={() => {
                              confirm({
                                header: "Eliminar concepto",
                                message: "¿Estás seguro?",
                                buttons: [
                                  "Cancelar",
                                  {
                                    text: "Confirmar",
                                    handler: (d) => {
                                      const newConcepts = JSON.parse(
                                        JSON.stringify(invoice.concepts)
                                      );
                                      newConcepts.splice(index, 1);
                                      setValue("concepts", newConcepts);
                                      onSubmit();
                                    },
                                  },
                                ],
                              });
                            }}
                          >
                            <IonIcon
                              icon={closeOutline}
                              color="dark"
                              size="small"
                            />
                          </IonFabButton>
                        </IonFab>
                      </IonCol>
                    </IonRow>
                  
                    <IonRow>
                      <IonItem lines="none">
                        <IonLabel>Uds: </IonLabel>
                        <IonInput
                          value={concept.units ?? ""}
                          onIonChange={(e): void => {
                            const newConcepts = JSON.parse(
                              JSON.stringify(invoice.concepts)
                            );
                            newConcepts[index].units = Number(e.detail.value) ?? "";
                            setValue("concepts", newConcepts);
                          }}
                        ></IonInput>
                        <IonInput
                          value={concept.base ? concept.base + " €" : ""}
                          placeholder="Base"
                          onIonChange={(e): void => {
                            const newConcepts = JSON.parse(
                              JSON.stringify(invoice.concepts)
                            );
                            newConcepts[index].base = Number(
                              e.detail.value ? e.detail.value.replace("€", "") : ""
                            );
                            setValue("concepts", newConcepts);
                          }}
                        ></IonInput>
                      </IonItem>
                    </IonRow>
                  </IonGrid>
                </IonCard>
              ))
            : ""}
  
          <IonPopover
            cssClass="concept-popover"
            event={popoverState.event}
            isOpen={popoverState.showPopover}
            onDidDismiss={() =>
              setShowPopover({ showPopover: false, event: undefined })
            }
          >
            <IonToolbar color="warning">
              <IonTitle className="ion-text-center">Nuevo concepto</IonTitle>
            </IonToolbar>
            <IonItem className="concept-text">
              <IonTextarea
                rows={6}
                placeholder="Concepto"
                onIonChange={(e): void => {
                  addConcept("concept", e.detail.value ?? "");
                }}
              ></IonTextarea>
            </IonItem>
            <IonItem>
              <IonInput
                type="number"
                placeholder="Unidades"
                onIonChange={(e): void => {
                  addConcept("units", e.detail.value ?? "");
                }}
              ></IonInput>
              <IonInput
                type="number"
                placeholder="Base"
                onIonChange={(e): void => {
                  addConcept("base", e.detail.value ?? "");
                }}
              ></IonInput>
            </IonItem>
            <IonItem className="ion-text-center ion-margin-top">
              <IonButton
                color="primary"
                type="submit"
                onClick={() => {
                  pushConcept();
                  setShowPopover({ showPopover: false, event: undefined });
                  onSubmit();
                }}
              >
                Añadir
              </IonButton>
            </IonItem>
          </IonPopover>
  
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            cssClass="my-custom-class"
            header={"Error"}
            message={alertText}
            buttons={["OK"]}
          />
        </form>
  
        {renderPDF ? <ProformInvoicePDF></ProformInvoicePDF> : null}
      </div>
    );
  };
  
  export default InvoiceForm;
  