import { IonContent, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { listOutline } from "ionicons/icons";
import React from "react";
import FormatHelper from "../helpers/FormatHelper";
import UrlHelper from "../helpers/UrlHelper";
import WorksListInterface from "../interfaces/WorksList";

const WorkList: React.FC<WorksListInterface> = (props) => {

  let works = props.works;

  return (
    <IonContent>
     <IonList>
        {works && works.length > 0
          ? works.map((work: any) => (
              <IonItem href={UrlHelper.MakeUrl("work", work._id)}>
                <IonIcon icon={listOutline} slot="start" />
                <IonLabel>
                  <h2>{work.name ?? ""}</h2>
                  <p>{work.date ? FormatHelper.FormatDate(work.date) : ""}</p>
                </IonLabel>
              </IonItem>
            ))
          : ""}
      </IonList>
    </IonContent>
  );
};

export default WorkList;
