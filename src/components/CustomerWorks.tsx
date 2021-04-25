import React from "react";
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
} from "@ionic/react";
import WorksListInterface from "../interfaces/WorksList";
import UrlHelper from "../helpers/UrlHelper";
import "../theme/customer-item.css";
import { listOutline } from "ionicons/icons";

const CustomerWorks: React.FC<WorksListInterface> = (props) => {
  let works = props.works;

  return (
    <IonContent>
      <IonTitle className="ion-text-center work-list-title">
        <IonLabel>Trabajos</IonLabel>
      </IonTitle>
      <IonList>
        {works
          ? works.map((work: any) => (
              <IonItem href={UrlHelper.MakeUrl("work", work._id)}>
                <IonIcon icon={listOutline} slot="start" />
                <IonLabel>
                  <h2>{work.name}</h2>
                  <p>{work.date}</p>
                </IonLabel>
              </IonItem>
            ))
          : ""}
      </IonList>
    </IonContent>
  );
};

export default CustomerWorks;
