import React, { useState } from "react";
import { IonContent } from "@ionic/react";
import { useParams } from "react-router";
import Header from "../components/Header";
import WorkForm from "../components/WorkForm";
import WorkInterface from "../interfaces/Work";
import ParamsInterface from "../interfaces/UrlParams";
import WorkModel from "../models/Work";
import HeaderInterface from "../interfaces/Header";
import UrlHelper from "../helpers/UrlHelper";


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
 
   header.backUrl = UrlHelper.MakeUrl('customer', data.customer_id);

   /**
    * Initialize form data
    */
   if (Object.keys(data).length > 0 && Object.keys(work).length === 0) {
     data = { ...data, ...{ action: "edit" } };
     setWork(data);
   }
 
   return (
     <IonContent>
       <Header {...header}></Header>
       <WorkForm {...work}></WorkForm>
     </IonContent>
   );
};

export default WorkProfile;
