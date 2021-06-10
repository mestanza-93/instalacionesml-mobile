import React from "react";
import {
  IonIcon,
  IonLabel,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonContent,
  IonItem,
  IonMenu,
  IonList,
} from "@ionic/react";

import {
  peopleOutline,
  calendarOutline,
  hammerOutline,
  fileTrayStackedOutline,
  folderOutline,
  addOutline,
  personOutline,
} from "ionicons/icons";

import "../theme/header.css";

const Menu: React.FC = () => {
  return (
    <IonMenu side="start" contentId="menu">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Instalaciones ML</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="menu" className="ion-padding">
        <IonList>
          <IonItem routerLink="/create-customer">
            <IonIcon icon={addOutline}></IonIcon>
            <IonLabel className="menu-item">Nuevo cliente</IonLabel>
          </IonItem>
          <IonItem routerLink="/customers">
            <IonIcon icon={peopleOutline}></IonIcon>
            <IonLabel className="menu-item">Clientes</IonLabel>
          </IonItem>
          <IonItem routerLink="/works">
            <IonIcon icon={hammerOutline}></IonIcon>
            <IonLabel className="menu-item">Trabajos</IonLabel>
          </IonItem>
          <IonItem routerLink="/invoices">
            <IonIcon icon={folderOutline}></IonIcon>
            <IonLabel className="menu-item">Facturas</IonLabel>
          </IonItem>
          <IonItem routerLink="/budgets">
            <IonIcon icon={fileTrayStackedOutline}></IonIcon>
            <IonLabel className="menu-item">Presupuestos</IonLabel>
          </IonItem>
          {/* <IonItem routerLink="/calendar">
            <IonIcon icon={calendarOutline}></IonIcon>
            <IonLabel className="menu-item">Calendario</IonLabel>
          </IonItem> */}
          <IonItem routerLink="/user">
            <IonIcon icon={personOutline}></IonIcon>
            <IonLabel className="menu-item">Mis datos</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
