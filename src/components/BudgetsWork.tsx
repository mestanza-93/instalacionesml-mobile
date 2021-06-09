import { IonContent, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { folderOutline } from "ionicons/icons";
import React from "react";
import FormatHelper from "../helpers/FormatHelper";
import UrlHelper from "../helpers/UrlHelper";
import BudgetListInterface from "../interfaces/BudgetList";

const BudgetsWork: React.FC<BudgetListInterface> = (props) => {
  let budgets = props.budgets;

  return (
    <IonContent>
      <IonItem className="ion-text-center" lines="none" color="primary">
        <IonLabel>Presupuestos</IonLabel>
      </IonItem>
      <IonList>
        {budgets && budgets.length > 0
          ? budgets.map((budget: any) => (
              <IonItem href={UrlHelper.MakeUrl("budget", budget._id)}>
                <IonIcon icon={folderOutline} slot="start" />
                <IonLabel>
                  <h2>
                    Presupuesto{" "}
                    {FormatHelper.PrintInvoiceTitle(
                      budget.year,
                      budget.budget_id
                    )}
                  </h2>
                  <p>
                    {budget.date ? FormatHelper.FormatDate(budget.date) : ""}
                  </p>
                </IonLabel>
              </IonItem>
            ))
          : ""}
      </IonList>
    </IonContent>
  );
};

export default BudgetsWork;
