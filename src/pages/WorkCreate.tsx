import React, { useState } from "react";
import {
  IonContent,
} from "@ionic/react";
import Header from "../components/Header";
import WorkForm from "../components/WorkForm";
import WorkInterface from "../interfaces/Work";
import ParamsInterface from "../interfaces/UrlParams";
import { useParams } from "react-router";

const WorkCreate: React.FC = () => {
  /**
   * Work structure
   */
  let title = "Nuevo trabajo";
  let data = {} as WorkInterface;
  data = {...data, ...{action:'create'}};
  const [work] = useState(data);

  let params = {} as ParamsInterface;
  params = useParams() ?? {};

  let customerId = params.id ?? null;
  work.customer_id = customerId;

  return (
    <IonContent>
      <Header title={title}></Header>
      <WorkForm {...work}></WorkForm>
    </IonContent>
  );
};

export default WorkCreate;
