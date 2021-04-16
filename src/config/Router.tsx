import React from "react";

import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Customer from "../pages/CustomerProfile";
import CustomerCreate from "../pages/CustomerCreate";
import Customers from "../pages/Customers";

const Router: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet id="menu">
        <Route exact path="/create-customer" component={CustomerCreate} />
        <Route exact path="/customer/:id" component={Customer} />
        <Route exact path="/customers" component={Customers} />
        <Route exact path="/" render={() => <Redirect to="/customers" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Router;
