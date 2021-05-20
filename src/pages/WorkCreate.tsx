import React, { useState } from "react";
import { IonContent } from "@ionic/react";
import Header from "../components/Header";
import WorkForm from "../components/WorkForm";
import WorkInterface from "../interfaces/Work";
import ParamsInterface from "../interfaces/UrlParams";
import { useParams } from "react-router";
import HeaderInterface from "../interfaces/Header";

const WorkCreate: React.FC = () => {
  /**
   * Work structure
   */

  let header = {} as HeaderInterface;
  header.title = "Nuevo trabajo";

  let data = {} as WorkInterface;
  data = { ...data, ...{ action: "create" } };
  const [work] = useState(data);

  let params = {} as ParamsInterface;
  params = useParams() ?? {};

  let customerId = params.id ?? null;
  work.customer_id = customerId;

  return (
    <IonContent>
      <Header {...header}></Header>
      <WorkForm {...work}></WorkForm>
    </IonContent>
  );
};

export default WorkCreate;
