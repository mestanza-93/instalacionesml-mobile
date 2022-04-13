import React, { useEffect, useState } from "react";
import { IonContent } from "@ionic/react";
import Header from "../components/Header";
import WorkModel from "../models/Work";
import WorksListInterface from "../interfaces/WorksList";
import HeaderInterface from "../interfaces/Header";
import FilterInterface from "../interfaces/Filters";
import CalendarComponent from "../components/Calendar";

import Kalend, { CalendarEvent, CalendarView, OnPageChangeData } from "kalend";
import "kalend/dist/styles/index.css";
import UrlHelper from "../helpers/UrlHelper";
import CalendarEventInterface from "../interfaces/CalendarEvent";
import FormatHelper from "../helpers/FormatHelper";
import WorkInterface from "../interfaces/Work";

const Calendar: React.FC = () => {
  /**
   * Works data
   */
  const [events, setEvents] = useState([] as CalendarEventInterface[]);
  const [changeEvent, setChangeEvent] = useState({} as OnPageChangeData);
  const [filters, setFilters] = useState({} as FilterInterface);

  let header = {} as HeaderInterface;
  header.title = "Calendario";

  let data = {} as WorksListInterface;
  
  /**
   * Works by date
   */
  let filter = {} as FilterInterface;
  filter.sort = "DATE_DESC";
  filter.limit = 50;

  const [works, setWorks] = useState(data.works ?? {});
  data = WorkModel.GetWorksByDate(filter) ?? {};

  // /**
  //  * Initialize works
  //  */
  // if (Object.keys(data).length > 0 && Object.keys(data.works).length > 0 && Object.keys(works).length === 0) {
  //   setWorks(data.works);
  // }

  // /**
  //  * Initialize events
  //  */
  // if (Object.keys(works).length > 0 && Object.keys(events).length === 0) {
  //   works.forEach((work) => {
  //     let event = {} as CalendarEventInterface;
  //     let eventName = work.customer.name && work.customer.name !== '' ? work.customer.name : (work.name ?? '');

  //     event = {
  //       id: work._id,
  //       startAt: work.date,
  //       endAt: work.date,
  //       timezoneStartAt: "Europe/Madrid",
  //       summary: eventName,
  //       color: FormatHelper.GetRandomColor(),
  //     };

  //     events.push(event);
  //   })
  // }

  useEffect(() => {
    console.log('ChangeEvent Effect');
    
    if (Object.keys(changeEvent).length > 0) {
      let newFilter = {} as FilterInterface;
      newFilter.sort = "DATE_DESC";
      
      newFilter.operators = [
        {
          field: "gte",
          value: changeEvent.rangeFrom
        },
        {
          field: "lte",
          value: changeEvent.rangeTo
        }
      ];
      setFilters(newFilter);
    }
    
  }, [changeEvent]);

    useEffect(() => {

    console.log('Filters Effect');
    console.log(filters);

    if (filters && Object.keys(filters).length > 0) {
      
      let newDate = WorkModel.GetWorksByDate(filters) ?? {};
      setWorks(newDate.works);

      setEvents([]);

      if (newDate && Object.keys(newDate).length > 0) {
        newDate.works.forEach((work) => {
          let event = {} as CalendarEventInterface;
          let eventName = work.customer.name && work.customer.name !== '' ? work.customer.name : (work.name ?? '');
    
          event = {
            id: work._id,
            startAt: work.date,
            endAt: work.date,
            timezoneStartAt: "Europe/Madrid",
            summary: eventName,
            color: FormatHelper.GetRandomColor(),
          };
          events.push(event);
        });

        setEvents(events);
      }
    }
  }, [filters]);

  useEffect(() => {

    console.log('Filters Effect');
    console.log(filters);

    if (filters && Object.keys(filters).length > 0) {
      
      let newDate = WorkModel.GetWorksByDate(filters) ?? {};
      setWorks(newDate.works);

      setEvents([]);

      if (newDate && Object.keys(newDate).length > 0) {
        newDate.works.forEach((work) => {
          let event = {} as CalendarEventInterface;
          let eventName = work.customer.name && work.customer.name !== '' ? work.customer.name : (work.name ?? '');
    
          event = {
            id: work._id,
            startAt: work.date,
            endAt: work.date,
            timezoneStartAt: "Europe/Madrid",
            summary: eventName,
            color: FormatHelper.GetRandomColor(),
          };
          events.push(event);
        });

        setEvents(events);
      }
    }
  }, [filters]);


  return (
    <IonContent>
      <Header {...header}></Header>
      <Kalend
        onEventClick={(event: CalendarEvent) => {
          window.location.href = UrlHelper.MakeUrl("work", event.id);
        }}
        onNewEventClick={() => {}}
        events={events}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        initialView={CalendarView.MONTH}
        disabledViews={[CalendarView.DAY, CalendarView.WEEK, CalendarView.THREE_DAYS]}
        onPageChange={(event: OnPageChangeData) => {
          setChangeEvent(event);
        }}
        timeFormat={"24"}
        weekDayStart={"Monday"}
        language={"es"}
      />
    </IonContent>
  );
};

export default Calendar;
