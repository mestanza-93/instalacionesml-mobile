import React, { useState } from "react";
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
