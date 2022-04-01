import { IonContent, IonItem, IonItemGroup } from "@ionic/react";
import React, { useState } from "react";
import WorksListInterface from "../interfaces/WorksList";
import CalendarEventInterface from "../interfaces/CalendarEvent";
import FormatHelper from "../helpers/FormatHelper";
import WorkModel from "../models/Work";
import UrlHelper from "../helpers/UrlHelper";
import FilterInterface from "../interfaces/Filters";
import { useMutation } from "@apollo/client";

import Kalend, { CalendarEvent, CalendarView, OnPageChangeData } from "kalend";
import "kalend/dist/styles/index.css";


const Calendar: React.FC<WorksListInterface> = (props) => {

  let worksProps = {} as WorksListInterface;
  worksProps = props;
  const [works, setWorks] = useState(worksProps.works);

  let events: CalendarEventInterface[] = [];

  if (works) {
    works.forEach((work) => {
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
  }

  const changeDataPage = (changeEvent: OnPageChangeData) => {
    console.log(changeEvent);

    let filters = {} as FilterInterface;
    filters.sort = "DATE_DESC";
    filters.limit = 50;
  
    let newDate = WorkModel.GetWorksByDate(filters) ?? {};
    setWorks(newDate.works);

  };

  return (
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
      onPageChange={(changeEvent: OnPageChangeData) => {
        changeDataPage(changeEvent);
      }}
      timeFormat={"24"}
      weekDayStart={"Monday"}
      language={"es"}
    />
  );
};

export default Calendar;
