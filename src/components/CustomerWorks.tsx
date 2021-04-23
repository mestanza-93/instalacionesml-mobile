import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/react";
import WorksListInterface from "../interfaces/WorksList";
import UrlHelper from "../helpers/UrlHelper";
import "../theme/customer-item.css";
import { codeWorkingOutline } from "ionicons/icons";

const CustomerWorks: React.FC<WorksListInterface> = (props) => {
  let works = props.works;

  return (
    <IonContent>
      {
        works.map((work: any) => (
          <IonCard>
            <IonCardHeader>
              <IonItem href={UrlHelper.MakeUrl('work', work._id)}>
                <IonIcon icon={codeWorkingOutline} slot="start" />
                <IonLabel>{work.name}</IonLabel>
              </IonItem>
            </IonCardHeader>
          </IonCard>
        ))
      }
    </IonContent>
  );
};

export default CustomerWorks;
