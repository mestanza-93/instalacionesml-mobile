import React from "react";
import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { personOutline } from "ionicons/icons";
import CustomerItemInterface from '../interfaces/CustomerItem';
import UrlHelper from '../helpers/UrlHelper';
import "../theme/customer-item.css";

const ItemCustomer: React.FC<CustomerItemInterface> = (props) => {

  return (
    <IonItem href={UrlHelper.MakeUrl('customer', props.customer._id)}>
      <IonIcon icon={personOutline} slot="start"></IonIcon>
      <IonLabel>
        <h2><b>{props.customer.name ? props.customer.name : props.customer.phone} {props.customer.lastname ?? ''} </b></h2>
        <span className="customer-list-small">{props.customer.address}</span>
      </IonLabel>
      <IonLabel position="fixed">
        <span className="customer-list-medium">{props.customer.phone ?? ''}</span>
      </IonLabel>
    </IonItem>
  );
};

export default ItemCustomer;
