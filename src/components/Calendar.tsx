import { IonContent } from "@ionic/react";
import React from "react";
import WorksListInterface from "../interfaces/WorksList";
import CalendarEventInterface from "../interfaces/CalendarEvent";
import FormatHelper from "../helpers/FormatHelper";

import Kalend, { CalendarView } from 'kalend';

const Calendar: React.FC<WorksListInterface> = (props) => {
  let works = props.works;
  let id = 0;
  let events = {};

  if (works) {
    works.forEach(work => {
      let date = FormatHelper.FormatDateCalendar(work.date);
      let event = {} as CalendarEventInterface;
      event = {
        id: work._id,
        startAt: work.date,
        endAt: work.date,
        timezoneStartAt: 'Europe/Madrid',
        summary: 'Trabajo',
        color: FormatHelper.GetRandomColor()
      };
      id++;

      if (date) {
        if (!events[date]) {
          events[date] = [];
        }
        events[date].push(event);
      }

    });
  }

  return (
    <IonContent>
      <Kalend
        onEventClick={() => {}}
        onNewEventClick={() => {}}
        events={events}
        initialDate={new Date().toISOString()}
        hourHeight={30}
        initialView={CalendarView.MONTH}
        disabledViews={[CalendarView.DAY]}
        onPageChange={() => {}}
      />
    </IonContent>
  );
};

export default Calendar;
