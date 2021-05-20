import React, { useState } from "react";
import {
  IonContent,
} from "@ionic/react";
import Header from "../components/Header";
import CustomerForm from "../components/CustomerForm";
import CustomerInterface from "../interfaces/Customer";
import HeaderInterface from "../interfaces/Header";

const CustomerProfile: React.FC = () => {
  /**
   * Customer structure
   */
  let header = {} as HeaderInterface;
  header.title = "Nuevo cliente";
  
  let data = {} as CustomerInterface;
  data = {...data, ...{action:'create'}};
  const [customer] = useState(data);

  return (
    <IonContent>
      <Header {...header}></Header>
      <CustomerForm {...customer}></CustomerForm>
    </IonContent>
  );
};

export default CustomerProfile;
