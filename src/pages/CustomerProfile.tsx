import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import Header from "../components/Header";
import CustomerModel from "../models/Customer";
import ParamsInterface from "../interfaces/UrlParams";
import CustomerInterface from "../interfaces/Customer";
import {
  callOutline,
  cardOutline,
  homeOutline,
  mailOutline,
  mapOutline,
  peopleOutline,
} from "ionicons/icons";
import "../theme/customer-profile.css";

const CustomerProfile: React.FC = () => {
  /**
   * Customer data
   */
  let title = "Perfil cliente";
  let data = {} as CustomerInterface;
  let params = {} as ParamsInterface;
  params = useParams() ?? {};

  let id = params.id ?? null;
  data = id ? CustomerModel.GetCustomerById(id) ?? {} : {};
  const [customer, setCustomer] = useState(data);

  /**
   * Form control
   */
  const { handleSubmit, setValue } = useForm<CustomerInterface>({
    defaultValues: { ...data },
    mode: "onSubmit",
  });

  /**
   * Initialize form
   */
  if (Object.keys(data).length > 0 && Object.keys(customer).length === 0) {
    setCustomer(data);
    setValue("name", data.name ?? "");
    setValue("lastname", data.lastname ?? "");
    setValue("phone", data.phone ?? "");
    setValue("phone2", data.phone2 ?? "");
    setValue("email", data.email ?? "");
    setValue("dni", data.dni ?? "");
    setValue("postalcode", data.postalcode ?? "");
    setValue("address", data.address ?? "");
    setValue("town", data.town ?? "");
  }

  /**
   * Process submit form
   */
  const onSubmit = handleSubmit((formData) => {
    formData._id = data._id;
    CustomerModel.UpdateCustomer(formData);
  });

  return (
    <IonContent>
      <Header title={title}></Header>
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
            value={customer.phone ?? ""}
            placeholder="Teléfono"
            onIonChange={(e): void => {
              setValue("phone", Number(e.detail.value ?? ""));
            }}
          ></IonInput>
          <IonInput
            value={customer.phone2 ?? ""}
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
            value={customer.postalcode ?? ""}
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
              Editar
            </IonButton>
          </IonLabel>
        </IonItem>
      </form>
    </IonContent>
  );
};

export default CustomerProfile;
