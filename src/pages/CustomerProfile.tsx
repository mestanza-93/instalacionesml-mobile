import React, { useEffect, useState } from "react";
import { IonButton, IonCheckbox, IonContent, IonIcon, IonInput, IonItem, IonLabel } from "@ionic/react";
import { useParams } from "react-router";
import Header from "../components/Header";
import CustomerModel from '../models/Customer';
import ParamsInterface from '../interfaces/UrlParams';
import CustomerInterface from '../interfaces/Customer';
import '../theme/customer-profile.css';
import { peopleOutline } from "ionicons/icons";

const CustomerProfile: React.FC = () => {

  let data = {} as CustomerInterface;
  let params = {} as ParamsInterface;
  params = useParams() ?? {};

  let id = params.id ?? null;

  data = id ? (CustomerModel.GetCustomerById(id) ?? {}) : {};

  const [customer, setCustomer] = useState(data);

  if (Object.keys(data).length > 0 && Object.keys(customer).length === 0) {
    setCustomer(data);
  }
  
  return (
    <IonContent>
      <Header title={customer.name}></Header>
      <form className="ion-padding">
        <IonItem>
          <IonLabel position="floating"><IonIcon slot="start" className="people-icon" icon={peopleOutline}></IonIcon> Nombre</IonLabel>
          <IonInput />
        </IonItem>
        <IonItem>
          <IonLabel position="floating"><IonIcon slot="start" className="people-icon" icon={peopleOutline}></IonIcon> Apellidos</IonLabel>
          <IonInput />
        </IonItem>

        <IonItem lines="none">
          <IonLabel>Remember me</IonLabel>
          <IonCheckbox defaultChecked={true} slot="start" />
        </IonItem>
        <IonButton className="ion-margin-top" type="submit" expand="block">
          Editar
        </IonButton>
      </form>
    </IonContent>
  );
};

export default CustomerProfile;
