import React, { useState } from "react";
import {
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";

const Footer: React.FC<any> = (props) => {
  return (
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
  );
};

export default Footer;
