import React, { useState } from "react";
import {
  IonContent,
} from "@ionic/react";
import Header from "../components/Header";
import CustomerForm from "../components/CustomerForm";
import CustomerInterface from "../interfaces/Customer";
import "../theme/customer-profile.css";

const CustomerProfile: React.FC = () => {
  /**
   * Customer structure
   */
  let title = "Nuevo cliente";
  let data = {} as CustomerInterface;
  const [customer] = useState(data);
  data = {...data, ...{action:'create'}};

  return (
    <IonContent>
      <Header title={title}></Header>
      <CustomerForm {...customer}></CustomerForm>
    </IonContent>
  );
};

export default CustomerProfile;
