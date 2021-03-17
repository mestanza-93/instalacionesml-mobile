/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import React from "react";
import Menu from "./pages/Menu";
import Router from "./config/Router";
import constants from "./constants";

import { IonApp } from "@ionic/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const App: React.FC = () => {

  const client = new ApolloClient({
    uri: constants.API_URL_LOCAL,
    cache: new InMemoryCache(),
  });

  return (
    <IonApp>
      <ApolloProvider client={client}>
        <Router></Router>
        <Menu></Menu>
      </ApolloProvider>
    </IonApp>
  );
};

export default App;
