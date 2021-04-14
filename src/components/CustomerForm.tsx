import { IonButton, IonIcon, IonInput, IonItem, IonLabel } from "@ionic/react";
import {
  callOutline,
  cardOutline,
  homeOutline,
  mailOutline,
  mapOutline,
  peopleOutline,
} from "ionicons/icons";
import { useForm } from "react-hook-form";
import CustomerModel from "../models/Customer";
import CustomerInterface from "../interfaces/Customer";
import "../theme/customer-profile.css";
import { useMutation } from "@apollo/client";

const CustomerForm: React.FC<CustomerInterface> = (props) => {
  const { handleSubmit, setValue } = useForm<CustomerInterface>({
    defaultValues: { ...props },
    mode: "onSubmit",
  });

  const [
    updateHandler,
  ] = useMutation(CustomerModel.UpdateCustomer(), {
    onCompleted:(data) => {
      /**
       * Change to States
       */
      window.location.reload();
    }
  });

  const onSubmit = handleSubmit((formData) => {

    if (props.action == "edit") {
      formData._id = props._id;
      updateHandler({ variables: formData });

    } else {
      /**
       * Change to create new user
       */
      formData._id = props._id;
      updateHandler({ variables: formData });
    }
  });

  return (
    <form className="ion-padding" onSubmit={onSubmit}>
      <IonItem>
        <IonIcon slot="start" icon={peopleOutline}></IonIcon>
        <IonInput
          value={props.name ?? ""}
          placeholder="Nombre"
          onIonChange={(e): void => {
            setValue("name", e.detail.value ?? "");
          }}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonIcon slot="start" icon={peopleOutline}></IonIcon>
        <IonInput
          value={props.lastname ?? ""}
          placeholder="Apellidos"
          onIonChange={(e): void => {
            setValue("lastname", e.detail.value ?? "");
          }}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonIcon slot="start" icon={callOutline}></IonIcon>
        <IonInput
          value={props.phone ?? ""}
          placeholder="Teléfono"
          onIonChange={(e): void => {
            setValue("phone", Number(e.detail.value ?? ""));
          }}
        ></IonInput>
        <IonInput
          value={props.phone2 ?? ""}
          placeholder="Teléfono 2"
          onIonChange={(e): void => {
            setValue("phone2", Number(e.detail.value ?? ""));
          }}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonIcon slot="start" icon={mailOutline}></IonIcon>
        <IonInput
          value={props.email ?? ""}
          placeholder="Email"
          onIonChange={(e): void => {
            setValue("email", e.detail.value ?? "");
          }}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonIcon slot="start" icon={cardOutline}></IonIcon>
        <IonInput
          value={props.dni ?? ""}
          placeholder="DNI - NIF"
          onIonChange={(e): void => {
            setValue("dni", e.detail.value ?? "");
          }}
        ></IonInput>
        <IonInput
          value={props.postalcode ?? ""}
          placeholder="Código postal"
          onIonChange={(e): void => {
            setValue("postalcode", Number(e.detail.value ?? ""));
          }}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonIcon slot="start" icon={homeOutline}></IonIcon>
        <IonInput
          value={props.address ?? ""}
          placeholder="Dirección"
          onIonChange={(e): void => {
            setValue("address", e.detail.value ?? "");
          }}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonIcon slot="start" icon={mapOutline}></IonIcon>
        <IonInput
          value={props.town ?? ""}
          placeholder="Población"
          onIonChange={(e): void => {
            setValue("town", e.detail.value ?? "");
          }}
        ></IonInput>
      </IonItem>

      <IonItem className="ion-text-center" lines="none">
        <IonLabel>
          <IonButton
            className="ion-margin-top customer-edit-button"
            color="warning"
            type="submit"
          >
            Editar
          </IonButton>
        </IonLabel>
      </IonItem>
    </form>
  );
};

export default CustomerForm;
