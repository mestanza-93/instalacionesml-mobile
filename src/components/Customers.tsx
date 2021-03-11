import React from 'react';
import { IonContent, IonList } from '@ionic/react';
import ItemCustomer from './ItemCustomer';

const Customers: React.FC = () => {
  return (
    <IonContent>
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