import React, { useState } from "react";
import { IonContent } from "@ionic/react";
import Header from "../components/Header";
import WorkModel from "../models/Work";
import WorksListInterface from "../interfaces/WorksList";
import HeaderInterface from "../interfaces/Header";
import FilterInterface from "../interfaces/Filters";
import CalendarComponent from "../components/Calendar";

const Calendar: React.FC = () => {
  /**
   * Works data
   */
  let header = {} as HeaderInterface;
  header.title = "Calendario";
  
  let data = {} as WorksListInterface;

  /**
   * Works by date
   */
   let filters = {} as FilterInterface;
   filters.sort = "DATE_DESC";
   filters.limit = 35;
 
   const [works, setWorks] = useState(data);
   data = WorkModel.GetWorksByDate(filters) ?? {};
 
   /**
    * Initialize list data
    */
   if (Object.keys(data).length > 0 && Object.keys(works).length === 0) {
     setWorks(data);
   }
 
   return (
     <IonContent>
       <Header {...header}></Header>
       <CalendarComponent {...works}></CalendarComponent>
     </IonContent>
   );
 };

export default Calendar;
