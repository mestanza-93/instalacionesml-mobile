import React from "react";
import {
  IonCard,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import WorksListInterface from "../interfaces/WorksList";
import UrlHelper from "../helpers/UrlHelper";
import FormatHelper from "../helpers/FormatHelper";
import "../theme/customer-item.css";
import { listOutline } from "ionicons/icons";

const CustomerWorks: React.FC<WorksListInterface> = (props) => {
  let works = props.works;

  return (
    <IonList>
      {works && works.length > 0
        ? works.map((work: any) => (
            <IonCard>
              <IonItem href={UrlHelper.MakeUrl("work", work._id)}>
                <IonIcon icon={listOutline} slot="start" />
                <IonLabel>
                  <h2>{work.name ?? ""}</h2>
                  <p>{work.date ? FormatHelper.FormatDate(work.date) : ""}</p>
                </IonLabel>
              </IonItem>
            </IonCard>
          ))
        : ""}
    </IonList>
  );
};

export default CustomerWorks;
