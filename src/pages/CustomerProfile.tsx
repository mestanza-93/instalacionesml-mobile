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
import Header from "../components/Header";
import CustomerModel from "../models/Customer";
import ParamsInterface from "../interfaces/UrlParams";
import CustomerInterface from "../interfaces/Customer";
import {
  callOutline,
  cardOutline,
  fileTrayOutline,
  homeOutline,
  mailOutline,
  mapOutline,
  peopleOutline,
} from "ionicons/icons";
import "../theme/customer-profile.css";

const CustomerProfile: React.FC = () => {

  let title = "Perfil cliente";
  let data = {} as CustomerInterface;
  let params = {} as ParamsInterface;
  params = useParams() ?? {};

  let id = params.id ?? null;

  data = id ? CustomerModel.GetCustomerById(id) ?? {} : {};

  const [customer, setCustomer] = useState(data);

  if (Object.keys(data).length > 0 && Object.keys(customer).length === 0) {
    setCustomer(data);
  }

  return (
    <IonContent>
      <Header title={title}></Header>
      <form className="ion-padding">
        <IonItem>
          <IonIcon slot="start" icon={peopleOutline}></IonIcon>
          <IonInput value={customer.name ?? ""} placeholder="Nombre"></IonInput>
        </IonItem>

        <IonItem>
          <IonIcon slot="start" icon={peopleOutline}></IonIcon>
          <IonInput
            value={customer.lastname ?? ""}
            placeholder="Apellidos"
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonIcon slot="start" icon={callOutline}></IonIcon>
          <IonInput
            value={customer.phone ?? ""}
            placeholder="Teléfono"
          ></IonInput>
          <IonInput
            value={customer.phone2 ?? ""}
            placeholder="Teléfono 2"
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonIcon slot="start" icon={mailOutline}></IonIcon>
          <IonInput value={customer.email ?? ""} placeholder="Email"></IonInput>
        </IonItem>

        <IonItem>
          <IonIcon slot="start" icon={cardOutline}></IonIcon>
          <IonInput
            value={customer.dni ?? ""}
            placeholder="DNI - NIF"
          ></IonInput>
          <IonInput
            value={customer.postalcode ?? ""}
            placeholder="Código postal"
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonIcon slot="start" icon={homeOutline}></IonIcon>
          <IonInput
            value={customer.address ?? ""}
            placeholder="Dirección"
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonIcon slot="start" icon={mapOutline}></IonIcon>
          <IonInput
            value={customer.town ?? ""}
            placeholder="Población"
          ></IonInput>
        </IonItem>

        <IonItem className="ion-text-center" lines="none">
          <IonLabel>
            <IonButton className="ion-margin-top customer-edit-button" color="warning" type="submit">
              Editar
            </IonButton>
          </IonLabel>
        </IonItem>
      </form>
    </IonContent>
  );
};

export default CustomerProfile;
