import React from "react";
import { IonHeader, IonTitle } from "@ionic/react";
import { useParams } from "react-router";

const CustomerProfile: React.FC = () => {

  let id = useParams();
  
  return (
    <IonHeader>
      <IonTitle>
        Pablo Mestanza
      </IonTitle>
    </IonHeader>
  );
};

export default CustomerProfile;
