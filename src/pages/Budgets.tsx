import React, { useState } from "react";
import { IonContent } from "@ionic/react";
import FilterInterface from "../interfaces/Filters";
import Header from "../components/Header";
import HeaderInterface from "../interfaces/Header";
import BudgetListInterface from "../interfaces/BudgetList";
import BudgetList from "../components/BudgetList";
import BudgetModel from "../models/Budget";

const Budgets: React.FC = () => {
  let header = {} as HeaderInterface;
  header.title = "Últimos presupuestos";
  
  let data = {} as BudgetListInterface;

  /**
   * Last budgets
   */
  let filters = {} as FilterInterface;
  filters.sort = "DATE_DESC";
  filters.limit = 35;

  const [budgets, setBudgets] = useState(data);
  data = BudgetModel.GetBudgets(filters) ?? {};

  /**
   * Initialize list data
   */
  if (Object.keys(data).length > 0 && Object.keys(budgets).length === 0) {
    setBudgets(data);
  }

  return (
    <IonContent>
      <Header {...header}></Header>
      <BudgetList {...budgets}></BudgetList>
    </IonContent>
  );
};

export default Budgets;
