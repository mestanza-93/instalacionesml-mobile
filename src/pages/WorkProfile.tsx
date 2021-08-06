import React, { Fragment, useState } from "react";
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
import Footer from "../components/Footer";

const WorkProfile: React.FC = () => {
  /**
   * Work data
   */
  let header = {} as HeaderInterface;
  header.title = "Trabajo";
  header.backName = "Cliente";

  let data = {} as WorkInterface;
  let invoicesData = {} as InvoiceListInterface;
  let budgetsData = {} as BudgetListInterface;

  let params = {} as ParamsInterface;
  params = useParams() ?? {};
  let id = params.id ?? null;

  const [work, setWork] = useState(data);
  const [invoices, setInvoices] = useState(invoicesData);
  const [budgets, setBudgets] = useState(budgetsData);

  let response = id ? WorkModel.GetWorkById(id) ?? {} : {};

  header.backUrl = UrlHelper.MakeUrl("customer", data.customer_id);

  data = response ?? [];
  invoicesData = response ?? [];
  budgetsData = response ?? [];


  /**
   * Initialize form data
   */
  if (Object.keys(data).length > 0 && Object.keys(work).length === 0) {
    data = { ...data, ...{ action: "edit" } };
    setWork(data);
  }

  if (Object.keys(invoicesData).length > 0 && Object.keys(invoices).length === 0) {
    setInvoices(invoicesData);
  }

  if (Object.keys(budgetsData).length > 0 && Object.keys(budgets).length === 0) {
    setBudgets(budgetsData);
  }

  return (
    <Fragment>
      <IonContent>
        <Header {...header}></Header>
        <WorkForm {...work}></WorkForm>

        {invoices.invoices && invoices.invoices.length > 0 ? (
          <InvoicesWork {...invoices}></InvoicesWork>
        ) : (
          ""
        )}

        {budgets.budgets && budgets.budgets.length > 0 ? (
          <BudgetsWork {...budgets}></BudgetsWork>
        ) : (
          ""
        )}
      </IonContent>
      <Footer workId={id} section="work"></Footer>
    </Fragment>
  );
};

export default WorkProfile;
