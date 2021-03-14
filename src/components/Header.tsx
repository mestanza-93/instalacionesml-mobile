import React from "react";
import {
  IonIcon,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuToggle,
} from "@ionic/react";

import { menuOutline } from 'ionicons/icons';
import HeaderInterface from '../interfaces/Header';

const Header: React.FC<HeaderInterface> = (props) => {

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuToggle autoHide={false}>
            <IonIcon icon={menuOutline}></IonIcon>
          </IonMenuToggle>
        </IonButtons>
        <IonTitle>{props.title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;