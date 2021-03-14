import React from "react";
import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { personOutline } from "ionicons/icons";

const ItemCustomer: React.FC = () => {
  return (
    <IonItem>
      <IonIcon icon={personOutline} slot="start"></IonIcon>
      <IonLabel>
        <h2>Antonio Fernández Luque</h2>
        <h3>C/ Avenida Gerald Brenan</h3>
      </IonLabel>
      <IonLabel position="fixed">
        <p>12 marzo 2021</p>
      </IonLabel>
    </IonItem>
  );
};

export default ItemCustomer;
