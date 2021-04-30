import React, { useState } from "react";
import {
  IonContent,
} from "@ionic/react";
import Header from "../components/Header";
import CustomerForm from "../components/CustomerForm";
import CustomerInterface from "../interfaces/Customer";

const CustomerProfile: React.FC = () => {
  /**
   * Customer structure
   */
  let title = "Nuevo cliente";
  let data = {} as CustomerInterface;
  data = {...data, ...{action:'create'}};
  const [customer] = useState(data);

  return (
    <IonContent>
      <Header title={title}></Header>
      <CustomerForm {...customer}></CustomerForm>
    </IonContent>
  );
};

export default CustomerProfile;
