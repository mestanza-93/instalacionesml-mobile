import React from "react";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import WorksListInterface from "../interfaces/WorksList";
import ParamsInterface from "../interfaces/UrlParams";
import UrlHelper from "../helpers/UrlHelper";
import FormatHelper from "../helpers/FormatHelper";
import "../theme/customer-item.css";
import { listOutline } from "ionicons/icons";
import { useParams } from "react-router";

const CustomerWorks: React.FC<WorksListInterface> = (props) => {
  let works = props.works;

  let params = {} as ParamsInterface;
  params = useParams() ?? {};

  let customerId = params.id ?? null;

  return (
    <IonContent>
      <IonItem className="ion-text-center" lines="none">
        <IonLabel>
          <IonButton
            className="ion-margin-top"
            color="primary"
            href={UrlHelper.MakeUrl("create-work", customerId)}
          >
            Nuevo trabajo
          </IonButton>
        </IonLabel>
      </IonItem>

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

export default CustomerWorks;
