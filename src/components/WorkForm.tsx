import {
  IonAlert,
  IonButton,
  IonDatetime,
  IonIcon,
  IonItem,
  IonLabel,
  IonTextarea,
  useIonAlert,
} from "@ionic/react";
import { calendarNumberOutline, documentTextOutline } from "ionicons/icons";
import { useForm } from "react-hook-form";
import WorkModel from "../models/Work";
import WorkInterface from "../interfaces/Work";
import UrlHelper from "../helpers/UrlHelper";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import Footer from "./Footer";

const WorkForm: React.FC<WorkInterface> = (props) => {
  const buttonTitle = props.action == "edit" ? "Editar" : "Crear";
  const alertText =
    props.action == "edit"
      ? "No se ha podido editar el trabajo"
      : "No se ha podido crear el trabajo";

  /**
   * Form control
   */
  const { handleSubmit, setValue } = useForm<WorkInterface>({
    defaultValues: { ...props },
    mode: "onSubmit",
  });

  /**
   * Initialize works fields if exists
   */
  const [work, setWork] = useState({} as WorkInterface);
  if (Object.keys(props).length > 0 && Object.keys(work).length === 0) {
    setWork(props);
  }

  /**
   * Handler works actions
   */
  const [showAlert, setShowAlert] = useState(false);
  const [confirm] = useIonAlert();

  const [updateHandler] = useMutation(WorkModel.UpdateWork(), {
    onCompleted: (response) => {
      let workResult = response.WorkUpdateById.record ?? {};
      setWork(workResult);
    },
  });

  const [createHandler] = useMutation(WorkModel.CreateWork(), {
    onCompleted: (response) => {
      let newID = response.WorkCreateOne.record._id ?? null;
      if (newID) {
        window.location.href = UrlHelper.MakeUrl("work", newID);
      } else {
        setShowAlert(true);
      }
    },
  });

  const [deleteHandler] = useMutation(WorkModel.DeleteWork(), {
    onCompleted: (response) => {
      let deletedID = response.WorkRemoveById ?? null;
      if (deletedID) {
        window.location.href = UrlHelper.MakeUrl("customer", work.customer_id);
      } else {
        setShowAlert(true);
      }
    },
  });

  const onSubmit = handleSubmit((formData) => {
    if (props.action == "edit") {
      formData._id = work._id;
      updateHandler({ variables: formData });
    } else if (props.action == "create") {
      createHandler({ variables: formData });
    }
  });

  const deleteWork = () => {
    deleteHandler({ variables: { _id: work._id } });
  };

  return (
    <form className="ion-padding" onSubmit={onSubmit}>
      <IonItem>
        <IonIcon slot="start" icon={documentTextOutline}></IonIcon>
        <IonTextarea
          rows={6}
          value={work.name ?? ""}
          placeholder="Descripción"
          onIonChange={(e): void => {
            setValue("name", e.detail.value ?? "");
          }}
        ></IonTextarea>
      </IonItem>

      <IonItem>
        <IonIcon slot="start" icon={calendarNumberOutline}></IonIcon>
        <IonDatetime
          displayFormat="DD-MM-YYYY HH:mm"
          value={work.date ?? ""}
          placeholder="Fecha"
          onIonChange={(e): void => {
            setValue("date", e.detail.value ?? "");
          }}
          cancelText="Cancelar"
          doneText="Aceptar"
        ></IonDatetime>
      </IonItem>

      <IonItem className="ion-text-center" lines="none">
        <IonLabel>
          <IonButton
            className="ion-margin-top work-edit-button"
            color="warning"
            type="submit"
          >
            {buttonTitle}
          </IonButton>
        </IonLabel>
        {props.action == "edit" ? (
          <IonLabel>
            <IonButton
              className="ion-margin-top work-delete-button"
              color="danger"
              onClick={() =>
                confirm({
                  header: "Eliminar trabajo",
                  message: "¿Estás seguro?",
                  buttons: [
                    "Cancelar",
                    { text: "Confirmar", handler: (d) => deleteWork() },
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

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        cssClass="my-custom-class"
        header={"Error"}
        message={alertText}
        buttons={["OK"]}
      />
    </form>
  );
};

export default WorkForm;
