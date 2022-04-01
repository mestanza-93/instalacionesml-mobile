import { IonContent, IonItem, IonItemGroup } from "@ionic/react";
import React from "react";
import WorksListInterface from "../interfaces/WorksList";
import CalendarEventInterface from "../interfaces/CalendarEvent";
import FormatHelper from "../helpers/FormatHelper";

import Kalend, { CalendarEvent, CalendarView, CALENDAR_VIEW } from "kalend";
import "kalend/dist/styles/index.css";
import UrlHelper from "../helpers/UrlHelper";

const Calendar: React.FC<WorksListInterface> = (props) => {
  let works = props.works;
  let id = 0;
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
      onPageChange={() => {}}
      timeFormat={"24"}
      weekDayStart={"Monday"}
      language={"es"}
    />
  );
};

export default Calendar;
