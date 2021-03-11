import React from "react";

import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Customer from "./CustomerProfile";
import Customers from "./Customers";

const Router: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/customer" component={Customer} exact={true} />
        <Route path="/customers" component={Customers} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/customers" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Router;
