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
import HeaderInterface from "../interfaces/Header";

const Header: React.FC<HeaderInterface> = (props) => {
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonMenuToggle autoHide={false}>
            <IonIcon icon={menuOutline}></IonIcon>
          </IonMenuToggle>
        </IonButtons>
        <IonTitle className="ion-text-center">{props.title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
