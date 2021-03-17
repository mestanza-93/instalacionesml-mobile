import React, { useState } from "react";
import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { personOutline } from "ionicons/icons";
import CustomerItemInterface from '../interfaces/CustomerItem';

const ItemCustomer: React.FC<CustomerItemInterface> = (props) => {

  return (
    <IonItem>
      <IonIcon icon={personOutline} slot="start"></IonIcon>
      <IonLabel>
        <h2>{props.customer.name} {props.customer.lastname}</h2>
        <h3>{props.customer.address}</h3>
      </IonLabel>
      <IonLabel position="fixed">
        <p>{props.customer.updated_at}</p>
      </IonLabel>
    </IonItem>
  );
};

export default ItemCustomer;
