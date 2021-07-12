import {
  IonAlert,
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";
import {
  callOutline,
  cardOutline,
  flagOutline,
  homeOutline,
  mailOutline,
  mapOutline,
  peopleOutline,
} from "ionicons/icons";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import UserModel from "../models/User";
import UserInterface from "../interfaces/User";

const UserForm: React.FC<UserInterface> = (props) => {
  const buttonTitle = "Editar";
  const alertText = "No se ha podido editar el cliente";

  /**
   * Form control
   */
  const { handleSubmit, setValue } = useForm<UserInterface>({
    defaultValues: { ...props },
    mode: "onSubmit",
  });

  /**
   * Initialize user fields if exists
   */
  const [user, setUser] = useState({} as UserInterface);
  if (Object.keys(props).length > 0 && Object.keys(user).length === 0) {
    setUser(props);
  }

  /**
   * Handler user actions
   */
  const [showAlert, setShowAlert] = useState(false);
  const [updateHandler] = useMutation(UserModel.UpdateUser(), {
    onCompleted: (response) => {
      let userResult = response.UserUpdateById.record ?? {};
      setUser(userResult);
    },
  });

  const onSubmit = handleSubmit((formData) => {
      formData._id = user._id;
      updateHandler({ variables: formData });
  });

  return (
    <form className="ion-padding" onSubmit={onSubmit}>
      <IonItem>
        <IonIcon slot="start" icon={peopleOutline}></IonIcon>
        <IonInput
          value={user.name ?? ""}
          placeholder="Nombre"
          onIonChange={(e): void => {
            setValue("name", e.detail.value ?? "");
          }}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonIcon slot="start" icon={peopleOutline}></IonIcon>
        <IonInput
          value={user.lastname ?? ""}
          placeholder="Apellidos"
          onIonChange={(e): void => {
            setValue("lastname", e.detail.value ?? "");
          }}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonIcon slot="start" icon={callOutline}></IonIcon>
        <IonInput
          value={user.phone !== 0 ? user.phone : ""}
          placeholder="Teléfono"
          onIonChange={(e): void => {
            setValue("phone", Number(e.detail.value ?? ""));
          }}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonIcon slot="start" icon={mailOutline}></IonIcon>
        <IonInput
          value={user.email ?? ""}
          placeholder="Email"
          onIonChange={(e): void => {
            setValue("email", e.detail.value ?? "");
          }}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonIcon slot="start" icon={cardOutline}></IonIcon>
        <IonInput
          value={user.dni ?? ""}
          placeholder="DNI - NIF"
          onIonChange={(e): void => {
            setValue("dni", e.detail.value ?? "");
          }}
        ></IonInput>
        <IonInput
          value={user.postalcode ?? ""}
          placeholder="Código postal"
          onIonChange={(e): void => {
            setValue("postalcode", e.detail.value ?? "");
          }}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonIcon slot="start" icon={mapOutline}></IonIcon>
        <IonInput
          value={user.town ?? ""}
          placeholder="Población"
          onIonChange={(e): void => {
            setValue("town", e.detail.value ?? "");
          }}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonIcon slot="start" icon={mapOutline}></IonIcon>
        <IonInput
          value={user.province ?? ""}
          placeholder="Provincia"
          onIonChange={(e): void => {
            setValue("province", e.detail.value ?? "");
          }}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonIcon slot="start" icon={flagOutline}></IonIcon>
        <IonInput
          value={user.country ?? ""}
          placeholder="País"
          onIonChange={(e): void => {
            setValue("country", e.detail.value ?? "");
          }}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonIcon slot="start" icon={homeOutline}></IonIcon>
        <IonInput
          value={user.address ?? ""}
          placeholder="Dirección"
          onIonChange={(e): void => {
            setValue("address", e.detail.value ?? "");
          }}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonIcon slot="start" icon={cardOutline}></IonIcon>
        <IonInput
          value={user.iban ?? ""}
          placeholder="IBAN"
          onIonChange={(e): void => {
            setValue("iban", e.detail.value ?? "");
          }}
        ></IonInput>
      </IonItem>

      <IonItem className="ion-text-center" lines="none">
        <IonLabel>
          <IonButton
            className="ion-margin-top user-edit-button"
            color="warning"
            type="submit"
          >
            {buttonTitle}
          </IonButton>
        </IonLabel>
      </IonItem>

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        cssClass="my-custom-class"
        header={"Error"}
        message={alertText}
        buttons={["OK"]}
      />
    </form>
  );
};

export default UserForm;
