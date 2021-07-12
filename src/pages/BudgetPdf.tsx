import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Pdf from "../components/Pdf";
import PdfInterface from "../interfaces/Pdf";
import ParamsInterface from "../interfaces/UrlParams";
import UserModel from "../models/User";
import BudgetModel from "../models/Budget";
import UserInterface from "../interfaces/User";
import BudgetInterface from "../interfaces/Budget";
import FormatHelper from "../helpers/FormatHelper";
import InvoiceInterface from "../interfaces/Invoice";

const BudgetPdf: React.FC = () => {
  let params = {} as ParamsInterface;
  let data = {} as PdfInterface;
  let userData = {} as UserInterface;
  let budgetData = {} as BudgetInterface;
  let invoiceData = {} as InvoiceInterface;

  data.type = "budget";
  params = useParams() ?? {};

  const [pdf, setPdf] = useState(data);

  const [download, setDownload] = useState(0);
  const [user, setUser] = useState(userData);
  userData = UserModel.GetUser() ?? {};

  let id = params.id ?? null;
  const [budget, setBudget] = useState(budgetData);
  budgetData = id ? BudgetModel.GetBudgetById(id, true) ?? {} : {};

  /**
   * Initialize user data
   */
  if (Object.keys(userData).length > 0 && Object.keys(user).length === 0) {
    setUser(userData);
    pdf.user = userData;
  }

  /**
   * Initialize budget data
   */
  if (
    Object.keys(budgetData).length > 0 &&
    Object.keys(budget).length === 0
  ) {
    let budgetAux = { ...budgetData };

    budgetAux.sum_base = 0;
    budgetAux.sum_iva = 0;
    budgetAux.total = 0;

    budgetAux.concepts.map((concept: any, index: number) => {
      let sum_base = concept.base * concept.units;
      let sum_iva = (budgetAux.iva * concept.base * concept.units) / 100;

      budgetAux.sum_base += sum_base;
      budgetAux.sum_iva += sum_iva;

      budgetAux.total += sum_base + sum_iva;
    });

    budgetAux.sum_base = FormatHelper.RoundNumber(budgetAux.sum_base, 2);
    budgetAux.sum_iva = FormatHelper.RoundNumber(budgetAux.sum_iva, 2);
    budgetAux.total = FormatHelper.RoundNumber(budgetAux.total, 2);

    pdf.item_id = budgetAux.budget_id;

    setBudget(budgetAux);
    pdf.invoice = invoiceData;
    pdf.budget = budgetAux;
    pdf.work = budgetAux.work ?? {};
    pdf.customer = budgetAux.work.customer ?? {};

    setDownload(1);
  }

  useEffect(() => {
    if (download == 1) {
      document.getElementById('page')?.removeAttribute('hidden');
      FormatHelper.GeneratePDF(
        "Presupuesto",
        FormatHelper.FormatZero(budget.budget_id)
      );
    }
  }, [download]);

  return (
    <div>
      <Pdf {...pdf}></Pdf>
    </div>
  );
};

export default BudgetPdf;
