import React, { useState } from "react";
import { IonContent } from "@ionic/react";
import { useParams } from "react-router";
import Header from "../components/Header";
import CustomerForm from "../components/CustomerForm";
import CustomerModel from "../models/Customer";
import WorkModel from "../models/Work";
import ParamsInterface from "../interfaces/UrlParams";
import CustomerInterface from "../interfaces/Customer";
import WorksListInterface from "../interfaces/WorksList";
import "../theme/customer-profile.css";
import CustomerWorks from "../components/CustomerWorks";

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
   * Initialize form data
   */
  if (Object.keys(data).length > 0 && Object.keys(customer).length === 0) {
    data = { ...data, ...{ action: "edit" } };
    setCustomer(data);
  }

  /**
   * Customer works
   */
  let dataWorks = {} as WorksListInterface;
  const [works, setWorks] = useState(dataWorks);
  dataWorks = id ? WorkModel.GetCustomerWorks(id) ?? dataWorks : dataWorks;

  /**
   * Initialize works data
   */
  if (Object.keys(dataWorks).length > 0 && Object.keys(works).length === 0) {
    setWorks(dataWorks);
  }

  return (
    <IonContent>
      <Header title={title}></Header>
      <CustomerForm {...customer}></CustomerForm>
      <CustomerWorks {...works}></CustomerWorks>
    </IonContent>
  );
};

export default CustomerProfile;
