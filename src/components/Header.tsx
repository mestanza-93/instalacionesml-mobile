import React from "react";
import {
  IonTitle,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonBackButton,
} from "@ionic/react";
import HeaderInterface from "../interfaces/Header";
import { arrowBack } from "ionicons/icons";

const Header: React.FC<HeaderInterface> = (props) => {
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonMenuButton autoHide={false}></IonMenuButton>
        </IonButtons>
        <IonTitle className="ion-text-center">{props.title}</IonTitle>
        
        {props.backUrl && props.backName ? 
          <IonButtons slot="end">
             <IonBackButton defaultHref={props.backUrl} text={props.backName} icon={arrowBack}></IonBackButton>
          </IonButtons>
        : ""}
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
