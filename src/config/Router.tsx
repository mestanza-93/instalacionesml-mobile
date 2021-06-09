import React from "react";

import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Customer from "../pages/CustomerProfile";
import CustomerCreate from "../pages/CustomerCreate";
import WorkCreate from "../pages/WorkCreate";
import Customers from "../pages/Customers";
import Work from "../pages/WorkProfile";
import Works from "../pages/Works";
import InvoiceCreate from "../pages/InvoiceCreate";
import Invoice from "../pages/InvoiceProfile";
import Invoices from "../pages/Invoices";
import BudgetCreate from "../pages/BudgetCreate";
import Budget from "../pages/BudgetProfile";
import Budgets from "../pages/Budgets";
import User from "../pages/User";

const Router: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet id="menu">
        <Route exact path="/create-customer" component={CustomerCreate} />
        <Route exact path="/customer/:id" component={Customer} />
        <Route exact path="/customers" component={Customers} />
        <Route exact path="/create-work/:id" component={WorkCreate} />
        <Route exact path="/work/:id" component={Work} />
        <Route exact path="/works" component={Works} />
        <Route exact path="/create-invoice/:id" component={InvoiceCreate} />
        <Route exact path="/invoice/:id" component={Invoice} />
        <Route exact path="/invoices" component={Invoices} />
        <Route exact path="/create-budget/:id" component={BudgetCreate} />
        <Route exact path="/budget/:id" component={Budget} />
        <Route exact path="/budgets" component={Budgets} />
        <Route exact path="/user" component={User} />
        <Route exact path="/" render={() => <Redirect to="/customers" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Router;
