import React, { useState } from "react";
import { useParams } from "react-router";
import { IonContent } from "@ionic/react";

import Header from "../components/Header";
import BudgetForm from "../components/BudgetForm";
import HeaderInterface from "../interfaces/Header";
import FilterInterface from "../interfaces/Filters";
import BudgetInterface from "../interfaces/Budget";
import ParamsInterface from "../interfaces/UrlParams";
import BudgetModel from "../models/Budget";

const BudgetCreate: React.FC = () => {
  /**
   * Budget structure
   */

  let header = {} as HeaderInterface;
  header.title = "Nuevo presupuesto";

  let data = {} as BudgetInterface;
  data = { ...data };
  const [budget] = useState(data);

  let params = {} as ParamsInterface;
  params = useParams() ?? {};

  let workId = params.id ?? null;

  /**
   * Get last Budget ID (MAX id)
   */
  let filters = {} as FilterInterface;
  filters.field = "year";
  filters.fieldValue = new Date().getFullYear();
  filters.fieldType = Number;
  filters.sort = "BUDGET_ID_DESC";
  filters.limit = 1;

  const lastBudget = BudgetModel.GetBudgets(filters) ?? {};

  if (Object.keys(lastBudget).length > 0 && !budget.budget_id) {
    budget.action = "create";
    budget.work_id = workId;
    budget.year = new Date().getFullYear();

    if (lastBudget.budgets && lastBudget.budgets[0].budget_id) {
      budget.budget_id = lastBudget.budgets[0].budget_id + 1;
    } else {
      budget.budget_id = 1;
    }
  }

  return (
    <IonContent>
      <Header {...header}></Header>
      <BudgetForm {...budget}></BudgetForm>
    </IonContent>
  );
};

export default BudgetCreate;
