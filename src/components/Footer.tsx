import React from "react";
import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import UrlHelper from "../helpers/UrlHelper";

const Footer: React.FC<any> = (props) => {
  return (
    <div className="ion-padding-top">
      {props.section == "invoice" || props.section == "budget" ? (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton
            onClick={(e: any) => {
              e.persist();
              props.setShowPopover({ showPopover: true, event: e });
            }}
          >
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      ) : props.section == "work" ? (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={addOutline} />
          </IonFabButton>
          <IonFabList side="start">
            <IonButton
              href={UrlHelper.MakeUrl("create-proform-invoice", props.workId)}
              size="small"
              color="secondary"
            >
              Proforma
            </IonButton>
            <IonButton
              href={UrlHelper.MakeUrl("create-budget", props.workId)}
              size="small"
              color="dark"
            >
              Presupuesto
            </IonButton>
            <IonButton
              href={UrlHelper.MakeUrl("create-invoice", props.workId)}
              size="small"
              color="warning"
            >
              Factura
            </IonButton>
          </IonFabList>
        </IonFab>
      ) : props.section == "customer" ? (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton
            href={UrlHelper.MakeUrl("create-work", props.customerId)}
          >
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      ) : (
        ""
      )}
    </div>
  );
};

export default Footer;
