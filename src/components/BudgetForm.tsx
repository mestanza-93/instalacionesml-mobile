import {
  IonAlert,
  IonButton,
  IonCard,
  IonDatetime,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPopover,
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
} from "ionicons/icons";
import "../theme/invoice.css";

import React, { Fragment, useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import BudgetModel from "../models/Budget";
import BudgetInterface from "../interfaces/Budget";
import UrlHelper from "../helpers/UrlHelper";
import FormatHelper from "../helpers/FormatHelper";
import ConceptInterface from "../interfaces/Concept";
import Footer from "../components/Footer";

const BudgetForm: React.FC<BudgetInterface> = (props) => {
  const buttonTitle = props.action == "edit" ? "Guardar" : "Crear";
  const alertText =
    props.action == "edit"
      ? "No se ha podido editar el presupuesto"
      : "No se ha podido crear el presupuesto";

  /**
   * Form control
   */
  const { handleSubmit, setValue } = useForm<BudgetInterface>({
    defaultValues: { ...props },
    mode: "onSubmit",
  });

  /**
   * Initialize Budget fields if exists
   */
  const [budget, setBudget] = useState({} as BudgetInterface);
  if (Object.keys(props).length > 0 && Object.keys(budget).length === 0) {
    setBudget(props);
  }

  /**
   * Concepts modal
   */
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });

  /**
   * Handler Budget actions
   */
  const [showAlert, setShowAlert] = useState(false);
  const [confirm] = useIonAlert();

  const [updateHandler] = useMutation(BudgetModel.UpdateBudget(), {
    onCompleted: (response) => {
      let BudgetResult = response.BudgetUpdateById.record ?? {};
      setBudget(BudgetResult);
    },
  });

  const [createHandler] = useMutation(BudgetModel.CreateBudget(), {
    onCompleted: (response) => {
      let newID = response.BudgetCreateOne.record._id ?? null;
      if (newID) {
        window.location.href = `/Budget/${newID}`;
      } else {
        setShowAlert(true);
      }
    },
  });

  const onSubmit = handleSubmit((formData) => {
    if (props.action == "edit") {
      formData._id = budget._id;
      updateHandler({ variables: formData });
    } else if (props.action == "create") {
      formData.work_id = budget.work_id;
      formData.budget_id = budget.budget_id;
      formData.concepts = budget.concepts;
      formData.year = budget.year;

      createHandler({ variables: formData });
    }
  });

  const [deleteHandler] = useMutation(BudgetModel.DeleteBudget(), {
    onCompleted: (response) => {
      let deletedID = response.BudgetRemoveById ?? null;
      if (deletedID) {
        window.location.href = UrlHelper.MakeUrl("Budgets");
      } else {
        setShowAlert(true);
      }
    },
  });

  const deleteBudget = () => {
    deleteHandler({ variables: { _id: budget._id } });
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
    const newConcepts = budget.concepts
      ? JSON.parse(JSON.stringify(budget.concepts))
      : [];
    let index = newConcepts.lastIndexOf(newConcepts.slice(-1)[0]) ?? 0;

    if (!newConcepts[index + 1]) {
      newConcepts[index + 1] = newConcept;
    }

    setValue("concepts", newConcepts);
    setNewConcept({} as ConceptInterface);
  };

  return (
    <Fragment>
      <form className="ion-padding" onSubmit={onSubmit}>
        <IonItem>
          <IonIcon slot="start" icon={documentTextOutline}></IonIcon>
          <IonLabel>
            Presupuesto{" "}
            {FormatHelper.PrintInvoiceTitle(budget.year, budget.budget_id) ??
              ""}
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonIcon slot="start" icon={calendarNumberOutline}></IonIcon>
          <IonDatetime
            displayFormat="DD-MM-YYYY HH:mm"
            value={budget.date ?? ""}
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
            value={budget.iva ?? ""}
            placeholder="% IVA"
            onIonChange={(e): void => {
              setValue("iva", e.detail.value ? Number(e.detail.value) : 21);
            }}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonIcon slot="start" icon={walletOutline}></IonIcon>
          <IonSelect
            value={budget.payment ?? ""}
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
            value={budget.comment ?? ""}
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
                      { text: "Confirmar", handler: (d) => deleteBudget() },
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
        </IonItem>

        {budget.concepts && budget.concepts.length > 0 ? (
          <IonItem className="ion-text-center" lines="none" color="primary">
            <IonLabel>Conceptos</IonLabel>
          </IonItem>
        ) : (
          ""
        )}
        {budget.concepts && budget.concepts.length > 0
          ? budget.concepts.map((concept: any, index: number) => (
              <IonCard>
                <IonItem className="concept-text">
                  <IonTextarea
                    rows={4}
                    value={concept.concept ?? ""}
                    placeholder="Concepto"
                    onIonChange={(e): void => {
                      const newConcepts = JSON.parse(
                        JSON.stringify(budget.concepts)
                      );
                      newConcepts[index].concept = e.detail.value ?? "";
                      setValue("concepts", newConcepts);
                    }}
                  ></IonTextarea>
                </IonItem>
                <IonItem>
                  <IonLabel>Uds: </IonLabel>
                  <IonInput
                    value={concept.units ?? ""}
                    onIonChange={(e): void => {
                      const newConcepts = JSON.parse(
                        JSON.stringify(budget.concepts)
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
                        JSON.stringify(budget.concepts)
                      );
                      newConcepts[index].base = Number(
                        e.detail.value ? e.detail.value.replace("€", "") : ""
                      );
                      setValue("concepts", newConcepts);
                    }}
                  ></IonInput>
                </IonItem>
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
              placeholder="Unidades"
              onIonChange={(e): void => {
                addConcept("units", e.detail.value ?? "");
              }}
            ></IonInput>
            <IonInput
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

      <Footer
        popoverState={popoverState}
        setShowPopover={setShowPopover}
      ></Footer>
    </Fragment>
  );
};

export default BudgetForm;
