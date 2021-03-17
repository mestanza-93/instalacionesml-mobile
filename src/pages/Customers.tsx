import React, { useState } from "react";
import { gql, useQuery } from '@apollo/client';

import {
  IonContent,
  IonList,
  IonSearchbar,
} from "@ionic/react";
import CustomerItem from "../components/CustomerItem";
import Header from "../components/Header";

const Customers: React.FC = () => {
  let title = "Clientes";

  const [searchText] = useState('');
  const customerItem = <CustomerItem></CustomerItem>;

  function setSearchText(text: String) {
    console.log(text);
  }

  const GET_CUSTOMERS = gql`
    {
      CustomerMany {
        name
        lastname
        phone
        address
        town
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  console.log("LOADING: " + loading);
  console.log("ERROR: " + error);
  console.log("DATA: " + data);


  return (
    <IonContent>
      <Header title={title}></Header>
      <IonSearchbar animated={true} placeholder="Buscar" value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
      <IonList>
        {customerItem}
        {customerItem}
        {customerItem}
        {customerItem}
        {customerItem}
        {customerItem}
        {customerItem}
        {customerItem}
      </IonList>
    </IonContent>
  );
};

export default Customers;
