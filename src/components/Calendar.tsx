import { IonContent, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import React from "react";
import WorksListInterface from "../interfaces/WorksList";

const Calendar: React.FC<WorksListInterface> = (props) => {
  let works = props.works;

  return <IonContent></IonContent>;
};

export default Calendar;
