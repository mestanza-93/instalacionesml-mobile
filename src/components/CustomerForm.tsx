import { IonAlert, IonButton, IonIcon, IonInput, IonItem, IonLabel } from "@ionic/react";
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
import { useMutation } from "@apollo/client";
import React, { useState } from "react";

const CustomerForm: React.FC<CustomerInterface> = (props) => {

  const buttonTitle = props.action == 'edit' ? 'Editar' : 'Crear';
  const alertText = props.action == 'edit' ? 'No se ha podido editar el cliente' : 'No se ha podido crear el cliente';


  /**
   * Form control
   */
  const { handleSubmit, setValue } = useForm<CustomerInterface>({
    defaultValues: { ...props },
    mode: "onSubmit",
  });

  /**
   * Initialize customer fields if exists
   */
  const [customer, setCustomer] = useState({} as CustomerInterface);
  if (Object.keys(props).length > 0 && Object.keys(customer).length === 0) {
    setCustomer(props);
  }

  /**
   * Handler customer actions
   */
  const [showAlert, setShowAlert] = useState(false);
  const [updateHandler] = useMutation(CustomerModel.UpdateCustomer(), {
    onCompleted: (response) => {
      let customerResult = response.CustomerUpdateById.record ?? {};
      setCustomer(customerResult);
    },
  });

  const [createHandler] = useMutation(CustomerModel.CreateCustomer(), {
    onCompleted: (response) => {
      let newID = response.CustomerCreateOne.record._id ?? null;
      if (newID) {
        window.location.href = `/customer/${newID}`;
      } else {
        setShowAlert(true);
      }
    },
  });

  const onSubmit = handleSubmit((formData) => {
    if (props.action == "edit") {
      formData._id = customer._id;
      updateHandler({ variables: formData });
    } else if (props.action == "create") {
      createHandler({ variables: formData });
    }
  });

  return (
    <form className="ion-padding" onSubmit={onSubmit}>
      <IonItem>
        <IonIcon slot="start" icon={peopleOutline}></IonIcon>
        <IonInput
          value={customer.name ?? ""}
          placeholder="Nombre"
          onIonChange={(e): void => {
            setValue("name", e.detail.value ?? "");
          }}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonIcon slot="start" icon={peopleOutline}></IonIcon>
        <IonInput
          value={customer.lastname ?? ""}
          placeholder="Apellidos"
          onIonChange={(e): void => {
            setValue("lastname", e.detail.value ?? "");
          }}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonIcon slot="start" icon={callOutline}></IonIcon>
        <IonInput
          value={customer.phone !== 0 ? customer.phone : ""}
          placeholder="Teléfono"
          onIonChange={(e): void => {
            setValue("phone", Number(e.detail.value ?? ""));
          }}
        ></IonInput>
        <IonInput
          value={customer.phone2 !== 0 ? customer.phone2 : ""}
          placeholder="Teléfono 2"
          onIonChange={(e): void => {
            setValue("phone2", Number(e.detail.value ?? ""));
          }}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonIcon slot="start" icon={mailOutline}></IonIcon>
        <IonInput
          value={customer.email ?? ""}
          placeholder="Email"
          onIonChange={(e): void => {
            setValue("email", e.detail.value ?? "");
          }}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonIcon slot="start" icon={cardOutline}></IonIcon>
        <IonInput
          value={customer.dni ?? ""}
          placeholder="DNI - NIF"
          onIonChange={(e): void => {
            setValue("dni", e.detail.value ?? "");
          }}
        ></IonInput>
        <IonInput
          value={customer.postalcode !== 0 ? customer.postalcode : ""}
          placeholder="Código postal"
          onIonChange={(e): void => {
            setValue("postalcode", Number(e.detail.value ?? ""));
          }}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonIcon slot="start" icon={homeOutline}></IonIcon>
        <IonInput
          value={customer.address ?? ""}
          placeholder="Dirección"
          onIonChange={(e): void => {
            setValue("address", e.detail.value ?? "");
          }}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonIcon slot="start" icon={mapOutline}></IonIcon>
        <IonInput
          value={customer.town ?? ""}
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
            {buttonTitle}
          </IonButton>
        </IonLabel>
        {props.action == "edit" ? (
          <IonLabel>
            <IonButton
              className="ion-margin-top customer-delete-button"
              color="danger"
              type="submit"
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
          cssClass='my-custom-class'
          header={'Error'}
          message={alertText}
          buttons={['OK']}
        />
    </form>
  );
};

export default CustomerForm;
