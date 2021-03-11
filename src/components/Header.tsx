import React from "react";
import {
  IonIcon,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuToggle,
} from "@ionic/react";

import { menuOutline } from "ionicons/icons";

const Header: React.FC = ({title}) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuToggle autoHide={false}>
            <IonIcon icon={menuOutline}></IonIcon>
          </IonMenuToggle>
        </IonButtons>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
