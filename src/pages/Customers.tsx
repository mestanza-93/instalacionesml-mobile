import React, { useState } from "react";

import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
} from "@ionic/react";
import Header from "../components/Header";
import ItemCustomer from "../components/CustomerItem";

import CustomerModel from '../models/Customer';

const Customers: React.FC = () => {
  let title = "Clientes";

  const [searchText] = useState('');

  function setSearchText(text: String) {
    console.log(text);
  }

  var limit = 0;
  var order = {
    field: 'updated_date',
    type: 'desc'
  };

  var customers = CustomerModel.GetCustomers(limit, order) ?? [];

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
