import { IonList, useIonAlert } from "@ionic/react";

import { useForm } from "react-hook-form";
import BudgetModel from "../models/Budget";
import BudgetInterface from "../interfaces/Budget";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import UrlHelper from "../helpers/UrlHelper";

const BudgetForm: React.FC<BudgetInterface> = (props) => {
  const buttonTitle = props.action == "edit" ? "Editar" : "Crear";
  const alertText =
    props.action == "edit"
      ? "No se ha podido editar el cliente"
      : "No se ha podido crear el cliente";

  /**
   * Form control
   */
  const { handleSubmit, setValue } = useForm<BudgetInterface>({
    defaultValues: { ...props },
    mode: "onSubmit",
  });

  /**
   * Initialize budget fields if exists
   */
  const [budget, setBudget] = useState({} as BudgetInterface);
  if (Object.keys(props).length > 0 && Object.keys(budget).length === 0) {
    setBudget(props);
  }

  /**
   * Handler customer actions
   */
  // const [showAlert, setShowAlert] = useState(false);
  // const [confirm] = useIonAlert();

  // const [updateHandler] = useMutation(InvoiceModel.UpdateCustomer(), {
  //   onCompleted: (response) => {
  //     let invoiceResult = response.CustomerUpdateById.record ?? {};
  //     setInvoice(invoiceResult);
  //   },
  // });

  // const [createHandler] = useMutation(InvoiceModel.CreateCustomer(), {
  //   onCompleted: (response) => {
  //     let newID = response.CustomerCreateOne.record._id ?? null;
  //     if (newID) {
  //       window.location.href = `/customer/${newID}`;
  //     } else {
  //       setShowAlert(true);
  //     }
  //   },
  // });

  // const onSubmit = handleSubmit((formData) => {
  //   if (props.action == "edit") {
  //     formData._id = invoice._id;
  //     updateHandler({ variables: formData });
  //   } else if (props.action == "create") {
  //     createHandler({ variables: formData });
  //   }
  // });

  // const [deleteHandler] = useMutation(InvoiceModel.DeleteCustomer(), {
  //   onCompleted: (response) => {
  //     let deletedID = response.CustomerRemoveById ?? null;
  //     if (deletedID) {
  //       window.location.href = UrlHelper.MakeUrl("customers");
  //     } else {
  //       setShowAlert(true);
  //     }
  //   },
  // });

  // const deleteInvoice = () => {
  //   deleteHandler({ variables: { _id: invoice._id } });
  // };

  return (
    <IonList></IonList>
  );
};

export default BudgetForm;
