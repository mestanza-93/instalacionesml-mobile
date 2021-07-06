import React, { useState } from "react";
import { IonContent } from "@ionic/react";
import { useParams } from "react-router";
import Header from "../components/Header";
import BudgetForm from "../components/BudgetForm";
import BudgetInterface from "../interfaces/Budget";
import ParamsInterface from "../interfaces/UrlParams";
import BudgetModel from "../models/Budget";
import HeaderInterface from "../interfaces/Header";
import UrlHelper from "../helpers/UrlHelper";

const BudgetProfile: React.FC = () => {
  /**
   * Budget data
   */
  let header = {} as HeaderInterface;
  header.title = "Presupuesto";
  header.backName = "Trabajo";

  let data = {} as BudgetInterface;
  let params = {} as ParamsInterface;
  params = useParams() ?? {};

  let id = params.id ?? null;
  const [budget, setBudget] = useState(data);
  data = id ? BudgetModel.GetBudgetById(id, false) ?? {} : {};

  header.backUrl = UrlHelper.MakeUrl("work", data.work_id);

  /**
   * Initialize form data
   */
  if (Object.keys(data).length > 0 && Object.keys(budget).length === 0) {
    data = { ...data, ...{ action: "edit" } };
    setBudget(data);
  }

  return (
    <IonContent>
      <Header {...header}></Header>
      <BudgetForm {...budget}></BudgetForm>
    </IonContent>
  );
};

export default BudgetProfile;
