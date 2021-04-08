import React, { useState } from "react";
import {
  IonContent,
} from "@ionic/react";
import { useParams } from "react-router";
import Header from "../components/Header";
import CustomerForm from "../components/CustomerForm";
import CustomerModel from "../models/Customer";
import ParamsInterface from "../interfaces/UrlParams";
import CustomerInterface from "../interfaces/Customer";
import "../theme/customer-profile.css";

const CustomerProfile: React.FC = () => {
  /**
   * Customer data
   */
  let title = "Perfil cliente";
  let data = {} as CustomerInterface;
  let params = {} as ParamsInterface;
  params = useParams() ?? {};

  let id = params.id ?? null;
  const [customer, setCustomer] = useState(data);
  data = id ? CustomerModel.GetCustomerById(id) ?? {} : {};

  /**
   * Initialize form
   */
  if (Object.keys(data).length > 0 && Object.keys(customer).length === 0) {
    setCustomer(data);
  }

  return (
    <IonContent>
      <Header title={title}></Header>
      <CustomerForm {...customer}></CustomerForm>
    </IonContent>
  );
};

export default CustomerProfile;
