import React, { useState } from "react";
import { IonContent } from "@ionic/react";
import { useParams } from "react-router";
import Header from "../components/Header";
import WorkForm from "../components/WorkForm";
import InvoicesWork from "../components/InvoicesWork";
import WorkInterface from "../interfaces/Work";
import ParamsInterface from "../interfaces/UrlParams";
import WorkModel from "../models/Work";
import InvoiceModel from "../models/Invoice";
import BudgetModel from "../models/Budget";
import HeaderInterface from "../interfaces/Header";
import UrlHelper from "../helpers/UrlHelper";
import FilterInterface from "../interfaces/Filters";
import InvoiceListInterface from "../interfaces/InvoiceList";
import BudgetListInterface from "../interfaces/BudgetList";
import BudgetsWork from "../components/BudgetsWork";

const WorkProfile: React.FC = () => {
  /**
   * Work data
   */
  let header = {} as HeaderInterface;
  header.title = "Trabajo";
  header.backName = "Cliente";

  let data = {} as WorkInterface;
  let params = {} as ParamsInterface;
  params = useParams() ?? {};

  let id = params.id ?? null;
  const [work, setWork] = useState(data);
  data = id ? WorkModel.GetWorkById(id) ?? {} : {};

  header.backUrl = UrlHelper.MakeUrl("customer", data.customer_id);

  /**
   * Initialize form data
   */
  if (Object.keys(data).length > 0 && Object.keys(work).length === 0) {
    data = { ...data, ...{ action: "edit" } };
    setWork(data);
  }

  /**
   * Work invoices
   */
  let invoicesData = {} as InvoiceListInterface;
  let filters = {} as FilterInterface;
  filters.field = "work_id";
  filters.fieldValue = id;

  const [invoices, setInvoices] = useState(invoicesData);
  invoicesData = InvoiceModel.GetInvoices(filters) ?? {};

  /**
   * Initialize list data
   */
  if (Object.keys(invoicesData).length > 0 && Object.keys(invoices).length === 0) {
    setInvoices(invoicesData);
  }

  /**
   * Work budgets
   */
  let budgetsData = {} as BudgetListInterface;
  filters = {} as FilterInterface;
  filters.field = "work_id";
  filters.fieldValue = id;

  const [budgets, setBudgets] = useState(budgetsData);
  budgetsData = BudgetModel.GetBudgets(filters) ?? {};

  /**
   * Initialize list data
   */
  if (Object.keys(budgetsData).length > 0 && Object.keys(budgets).length === 0) {
    setBudgets(budgetsData);
  }

  return (
    <IonContent>
      <Header {...header}></Header>
      <WorkForm {...work}></WorkForm>
      <InvoicesWork {...invoices}></InvoicesWork>
      <BudgetsWork {...budgets}></BudgetsWork>
    </IonContent>
  );
};

export default WorkProfile;
