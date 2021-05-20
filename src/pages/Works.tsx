import React, { useState } from "react";
import { IonContent } from "@ionic/react";
import FilterInterface from "../interfaces/Filters";
import WorkListInterface from "../interfaces/WorksList";
import Header from "../components/Header";
import WorkList from "../components/WorkList";
import WorkModel from "../models/Work";

const Works: React.FC = () => {
  let title = "Últimos trabajos";
  let data = {} as WorkListInterface;

  /**
   * Last works
   */
  let filters = {} as FilterInterface;
  filters.sort = "DATE_DESC";
  filters.limit = 25;

  const [works, setWorks] = useState(data);
  data = WorkModel.GetLastWorks(filters) ?? {};

  /**
   * Initialize list data
   */
  if (Object.keys(data).length > 0 && Object.keys(works).length === 0) {
    setWorks(data);
  }

  return (
    <IonContent>
      <Header title={title}></Header>
      <WorkList {...works}></WorkList>
    </IonContent>
  );
};

export default Works;
