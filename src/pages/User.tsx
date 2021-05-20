import React, { useState } from "react";
import { IonContent } from "@ionic/react";
import Header from "../components/Header";
import UserForm from "../components/UserForm";
import UserModel from "../models/User";
import UserInterface from "../interfaces/User";

const UserProfile: React.FC = () => {
  /**
   * Customer data
   */
  let title = "Mis datos";
  let data = {} as UserInterface;

  const [user, setUser] = useState(data);
  data = UserModel.GetUser() ?? {};

  /**
   * Initialize form data
   */
  if (Object.keys(data).length > 0 && Object.keys(user).length === 0) {
    setUser(data);
  }

  return (
    <IonContent>
      <Header title={title}></Header>
      <UserForm {...user}></UserForm>
    </IonContent>
  );
};

export default UserProfile;
