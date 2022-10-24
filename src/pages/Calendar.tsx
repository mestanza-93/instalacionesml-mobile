import React, { useState } from "react";
import { IonContent } from "@ionic/react";
import Header from "../components/Header";
import WorkModel from "../models/Work";
import WorksListInterface from "../interfaces/WorksList";
import HeaderInterface from "../interfaces/Header";
import FilterInterface from "../interfaces/Filters";

import Kalend, { CalendarEvent, CalendarView, OnPageChangeData } from "kalend";
import "kalend/dist/styles/index.css";
import UrlHelper from "../helpers/UrlHelper";
import CalendarEventInterface from "../interfaces/CalendarEvent";
import FormatHelper from "../helpers/FormatHelper";

const Calendar: React.FC = () => {
  /**
   * Works data
   */
  const [events, setEvents] = useState([] as CalendarEventInterface[]);
  const [changeEvent, setChangeEvent] = useState({} as OnPageChangeData);

  let header = {} as HeaderInterface;
  header.title = "Calendario";

  let data = {} as WorksListInterface;

  /**
   * Works by date
   */
  let filter = {} as FilterInterface;
  filter.sort = "DATE_DESC";
  filter.limit = 50;

  if (Object.keys(changeEvent).length > 0) {
    filter.limit = 200;
    filter.field = "date";
    filter.fieldType = "operator";
    filter.operators = [
      {
        field: "gte",
        value: changeEvent.rangeFrom,
      },
      {
        field: "lte",
        value: changeEvent.rangeTo,
      },
    ];
  }

  data = WorkModel.GetWorksByDate(filter) ?? {};

  if (Object.keys(changeEvent).length > 0 && data.works && Object.keys(data.works).length > 0) {

    events.length = 0;
    data.works?.forEach((work) => {
      let event = {} as CalendarEventInterface;
      let eventName =
        work.customer.name && work.customer.name !== ""
          ? work.customer.name
          : work.name ?? "";

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
        disabledViews={[
          CalendarView.DAY,
          CalendarView.WEEK,
          CalendarView.THREE_DAYS,
        ]}
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
