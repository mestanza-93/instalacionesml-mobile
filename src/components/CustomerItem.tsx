import React, { useState } from "react";
import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { personOutline } from "ionicons/icons";

const ItemCustomer: React.FC = () => {

  let data = {
    name: 'Antonio',
    lastname: 'Fernández Luque',
    address: 'C/ Avenida Gerald Brenan',
    date: '12 marzo 2021'
  };

  return (
    <IonItem>
      <IonIcon icon={personOutline} slot="start"></IonIcon>
      <IonLabel>
        <h2>{data.name} {data.lastname}</h2>
        <h3>{data.address}</h3>
      </IonLabel>
      <IonLabel position="fixed">
        <p>{data.date}</p>
      </IonLabel>
    </IonItem>
  );
};

export default ItemCustomer;
