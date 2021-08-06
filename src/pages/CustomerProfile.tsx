import React, { Fragment, useState } from "react";
import { IonContent } from "@ionic/react";
import { useParams } from "react-router";
import Header from "../components/Header";
import CustomerForm from "../components/CustomerForm";
import CustomerWorks from "../components/CustomerWorks";
import Footer from "../components/Footer";
import CustomerModel from "../models/Customer";
import ParamsInterface from "../interfaces/UrlParams";
import CustomerInterface from "../interfaces/Customer";
import WorksListInterface from "../interfaces/WorksList";
import HeaderInterface from "../interfaces/Header";

const CustomerProfile: React.FC = () => {
  /**
   * Customer data
   */
  let header = {} as HeaderInterface;
  header.title = "Perfil cliente";

  let data = {} as CustomerInterface;
  let dataWorks = {} as WorksListInterface;
  let params = {} as ParamsInterface;
  params = useParams() ?? {};

  let id = params.id ?? null;
  const [customer, setCustomer] = useState(data);
  const [works, setWorks] = useState(dataWorks);

  let response = id ? CustomerModel.GetCustomerById(id, true) ?? {} : {};

  dataWorks = response ?? [];
  data = response ?? [];

  /**
   * Initialize form data
   */
  if (Object.keys(data).length > 0 && Object.keys(customer).length === 0) {
    data = { ...data, ...{ action: "edit" } };
    setCustomer(data);
  }

  if (Object.keys(dataWorks).length > 0 && Object.keys(works).length === 0) {
    setWorks(dataWorks);
  }

  return (
    <Fragment>
      <IonContent>
        <Header {...header}></Header>
        <CustomerForm {...customer}></CustomerForm>
        <CustomerWorks {...works}></CustomerWorks>
      </IonContent>
      <Footer customerId={id} section="customer"></Footer>
    </Fragment>
  );
};

export default CustomerProfile;
