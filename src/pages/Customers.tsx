import React, { useEffect, useState } from "react";

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
import FilterInterface from "../interfaces/Filters";
import HeaderInterface from "../interfaces/Header";

let header = {} as HeaderInterface;
header.title = "Clientes";

let showLimit = 25;

let filters = {} as FilterInterface;
filters.sort = 'NAME_ASC';
filters.limit = 5000;

const Customers: React.FC = () => {

  const customers = CustomerModel.GetCustomers(filters) ?? [];
  const [searchText, setSearchText] = useState('');
  const [searchCustomers, setSearchCustomers] = useState(customers.slice(0, showLimit));

  if (customers.length && !searchCustomers.length) {
    setSearchCustomers(customers.slice(0, showLimit));
  }

  const handleChange = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {

    let results = Array;

    if (searchText == '') {
      results = customers.slice(0, showLimit);

    } else {
      results = customers.filter((item: CustomerInterface) => 
        (
          (item.name && item.name.toLowerCase().includes(searchText.toLowerCase())) || 
          (item.lastname && item.lastname.toLowerCase().includes(searchText.toLowerCase())) ||
          (item.name && item.lastname && item.name.toLocaleLowerCase().concat(' ', item.lastname.toLowerCase()).includes(searchText.toLowerCase())) ||
          (item.address && item.address.toLowerCase().includes(searchText.toLowerCase())) ||
          (item.town && item.town.toLowerCase().includes(searchText.toLowerCase())) ||
          (item.phone && item.phone && item.phone.toString().includes(searchText.toLowerCase())) ||
          (item.postalcode && item.postalcode && item.postalcode.toString().includes(searchText.toLowerCase()))
        )
      );
    }

    if (results.length) {
      setSearchCustomers(results);
    }

  }, [searchText]);


  if (customers){
    return (
      <IonContent>
        <Header {...header}></Header>
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
        <Header {...header}></Header>
        
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
