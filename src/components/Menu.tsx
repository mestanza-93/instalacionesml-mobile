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
} from "ionicons/icons";

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
          <IonItem routerLink="/customers">
            <IonLabel>Clientes</IonLabel>
            <IonIcon icon={peopleOutline}></IonIcon>
          </IonItem>
          <IonItem routerLink="/works">
            <IonLabel>Trabajos</IonLabel>
            <IonIcon icon={hammerOutline}></IonIcon>
          </IonItem>
          <IonItem routerLink="/invoices">
            <IonLabel>Facturas</IonLabel>
            <IonIcon icon={folderOutline}></IonIcon>
          </IonItem>
          <IonItem routerLink="/budgets">
            <IonLabel>Presupuestos</IonLabel>
            <IonIcon icon={fileTrayStackedOutline}></IonIcon>
          </IonItem>
          <IonItem routerLink="/calendar">
            <IonLabel>Calendario</IonLabel>
            <IonIcon icon={calendarOutline}></IonIcon>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
