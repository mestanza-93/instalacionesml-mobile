import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useParams } from "react-router";
import { useForm, Controller } from "react-hook-form";
import Header from "../components/Header";
import CustomerModel from "../models/Customer";
import ParamsInterface from "../interfaces/UrlParams";
import CustomerInterface from "../interfaces/Customer";
import {
  callOutline,
  cardOutline,
  homeOutline,
  mailOutline,
  mapOutline,
  peopleOutline,
} from "ionicons/icons";
import "../theme/customer-profile.css";

const CustomerProfile: React.FC = () => {
  /**
   * Customer data
   */
  let title = "Perfil cliente";
  let data = {} as CustomerInterface;
  let params = {} as ParamsInterface;
  params = useParams() ?? {};

  let id = params.id ?? null;
  data = id ? CustomerModel.GetCustomerById(id) ?? {} : {};
  const [customer, setCustomer] = useState(data);

  if (Object.keys(data).length > 0 && Object.keys(customer).length === 0) {
    setCustomer(data);
  }

  /**
   * Form control
   */
  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: data
  });

  const onSubmit = (formData: CustomerInterface) => {
    console.log("Form submitted");
    console.log(formData);
  };

  return (
    <IonContent>
      <Header title={title}></Header>
      <form className="ion-padding" onSubmit={handleSubmit(onSubmit)}>
        <IonItem>
          <IonIcon slot="start" icon={peopleOutline}></IonIcon>
          <Controller
            render={() => (
              <IonInput
                value={customer.name ?? ""}
                placeholder="Nombre"
              ></IonInput>
            )}
            control={control}
            name="name"
          />
        </IonItem>

        <IonItem>
          <IonIcon slot="start" icon={peopleOutline}></IonIcon>
          <Controller
            render={() => (
              <IonInput
                value={customer.lastname ?? ""}
                placeholder="Apellidos"
              ></IonInput>
            )}
            control={control}
            name="lastname"
          />
        </IonItem>

        <IonItem>
          <IonIcon slot="start" icon={callOutline}></IonIcon>
          <Controller
            render={() => (
              <IonInput
                value={customer.phone ?? ""}
                placeholder="Teléfono"
              ></IonInput>
            )}
            control={control}
            name="phone"
          />
          <Controller
            render={() => (
              <IonInput
                value={customer.phone2 ?? ""}
                placeholder="Teléfono 2"
              ></IonInput>
            )}
            control={control}
            name="phone2"
          />
        </IonItem>

        <IonItem>
          <IonIcon slot="start" icon={mailOutline}></IonIcon>
          <Controller
            render={() => (
              <IonInput
                value={customer.email ?? ""}
                placeholder="Email"
              ></IonInput>
            )}
            control={control}
            name="email"
          />
        </IonItem>

        <IonItem>
          <IonIcon slot="start" icon={cardOutline}></IonIcon>
          <Controller
            render={() => (
              <IonInput
                value={customer.dni ?? ""}
                placeholder="DNI - NIF"
              ></IonInput>
            )}
            control={control}
            name="dni"
          />
          <Controller
            render={() => (
              <IonInput
                value={customer.postalcode ?? ""}
                placeholder="Código postal"
              ></IonInput>
            )}
            control={control}
            name="postalcode"
          />
        </IonItem>

        <IonItem>
          <IonIcon slot="start" icon={homeOutline}></IonIcon>
          <Controller
            render={() => (
              <IonInput
                value={customer.address ?? ""}
                placeholder="Dirección"
              ></IonInput>
            )}
            control={control}
            name="address"
          />
        </IonItem>

        <IonItem>
          <IonIcon slot="start" icon={mapOutline}></IonIcon>
          <Controller
            render={() => (
              <IonInput
                value={customer.town ?? ""}
                placeholder="Población"
              ></IonInput>
            )}
            control={control}
            name="town"
          />
        </IonItem>

        <IonItem className="ion-text-center" lines="none">
          <IonLabel>
            <IonButton
              className="ion-margin-top customer-edit-button"
              color="warning"
              type="submit"
            >
              Editar
            </IonButton>
          </IonLabel>
        </IonItem>
      </form>
    </IonContent>
  );
};

export default CustomerProfile;
