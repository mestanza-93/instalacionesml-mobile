import React from "react";
import {
  IonIcon,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuToggle,
} from "@ionic/react";

import {
  menuOutline
} from "ionicons/icons";

const Menu: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuToggle autoHide={false}>
            <IonIcon icon={menuOutline}></IonIcon>
          </IonMenuToggle>
        </IonButtons>
        <IonTitle>Instalaciones ML</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Menu;
