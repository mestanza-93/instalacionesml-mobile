import React from "react";
import {
  IonContent,
  IonList,
  IonSearchbar,
} from "@ionic/react";
import ItemCustomer from "../components/ItemCustomer";
import Header from "../components/Header";

const Customers: React.FC = () => {
  let title = "Clientes";

  return (
    <IonContent>
      <Header title={title}></Header>
      <IonSearchbar animated={true} placeholder="Buscar"></IonSearchbar>
      <IonList>
        <ItemCustomer></ItemCustomer>
        <ItemCustomer></ItemCustomer>
        <ItemCustomer></ItemCustomer>
        <ItemCustomer></ItemCustomer>
        <ItemCustomer></ItemCustomer>
        <ItemCustomer></ItemCustomer>
        <ItemCustomer></ItemCustomer>
        <ItemCustomer></ItemCustomer>
      </IonList>
    </IonContent>
  );
};

export default Customers;
