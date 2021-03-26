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
  menuOutline,
  calendarOutline,
  hammerOutline,
  fileTrayStackedOutline,
  folderOutline,
} from "ionicons/icons";

const Menu: React.FC = () => {
  return (
    <IonMenu side="start" content-id="menu">
      <IonHeader>
        <IonToolbar>
          <IonIcon icon={menuOutline}></IonIcon>
          <IonTitle>Menu</IonTitle>
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
