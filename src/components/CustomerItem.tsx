import React from "react";
import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { personOutline } from "ionicons/icons";
import CustomerItemInterface from '../interfaces/CustomerItem';
import FormatHelper from "../helpers/FormatHelper";

const ItemCustomer: React.FC<CustomerItemInterface> = (props) => {

  return (
    <IonItem>
      <IonIcon icon={personOutline} slot="start"></IonIcon>
      <IonLabel>
        <h2><b>{props.customer.name ? props.customer.name : props.customer.phone} {props.customer.lastname}</b></h2>
        <h3>{props.customer.address}</h3>
      </IonLabel>
      <IonLabel position="fixed">
        <p>{props.customer.updated_at ? FormatHelper.FormatDate(props.customer.updated_at) : ''}</p>
      </IonLabel>
    </IonItem>
  );
};

export default ItemCustomer;
