import React, { useState } from "react";
import { gql, useQuery } from '@apollo/client';

import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
} from "@ionic/react";
import Header from "../components/Header";
import ItemCustomer from "../components/CustomerItem";

const Customers: React.FC = () => {
  let title = "Clientes";

  const [searchText] = useState('');

  function setSearchText(text: String) {
    console.log(text);
  }

  const GET_CUSTOMERS = gql`
    {
      CustomerMany(limit: 10) {
        name
        lastname
        phone
        address
        town
      }
    }
  `;

  let { loading, error, data } = useQuery(GET_CUSTOMERS);

  console.log("LOADING: " + loading);
  console.log("ERROR: " + error);

  var customers = [];

  if (data) {
    customers = data['CustomerMany'] ?? [];
  }

  if (customers){
    return (
      <IonContent>
        <Header title={title}></Header>
        <IonSearchbar animated={true} placeholder="Buscar" value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
        <IonList>
          {
            customers.map((customer: any) => (
              <ItemCustomer customer={customer}></ItemCustomer>
            ))
          }
        </IonList>
      </IonContent>
    );
  } else {
    return (
      <IonContent>
        <Header title={title}></Header>
        
        <IonList>
          <IonItem>
            <IonLabel><h1>No hay clientes</h1></IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    );
  } 


};

export default Customers;
