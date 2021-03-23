import React, { useEffect, useRef, useState } from "react";

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
import CustomerInterface from '../interfaces/Customer';

const Customers: React.FC = () => {
  
  let title = "Clientes";
  let limit = 25;
  let sort = 'NAME_ASC';

  const customers = CustomerModel.GetCustomers(limit, sort) ?? [];

  const [searchText, setSearchText] = useState('');
  const [searchCustomers, setSearchCustomers] = useState([]);

  const handleChange = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    const results = customers.filter((item: CustomerInterface) => 
      (
        (item.name.toLowerCase().includes(searchText.toLowerCase())) || 
        (item.lastname.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.address.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.town.toLowerCase().includes(searchText.toLowerCase()))
      )
    );
        
    setSearchCustomers(results);
  }, [searchText]);


  if (customers){
    return (
      <IonContent>
        <Header title={title}></Header>
        <IonSearchbar animated={true} placeholder="Buscar" value={searchText} onIonChange={e => handleChange(e.detail.value!)}></IonSearchbar>
        <IonList>
          {
            searchCustomers.map((customer: any) => (
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
