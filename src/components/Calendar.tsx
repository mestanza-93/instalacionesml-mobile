import { IonContent } from "@ionic/react";
import React from "react";
import WorksListInterface from "../interfaces/WorksList";
import CalendarEventsInterface from "../interfaces/CalendarEvents";
import FormatHelper from "../helpers/FormatHelper";

import Kalend, { CalendarView } from 'kalend';
import 'kalend/dist/styles/index.css';
import { calendarOutline } from "ionicons/icons";

const Calendar: React.FC<WorksListInterface> = (props) => {
  let works = props.works;
  let calendar = {} as CalendarEventsInterface;
  let id = 0;

  if (works) {
    works.forEach(work => {
      let date = FormatHelper.FormatDateCalendar(work.date);
      let event = {
        id: id,
        startAt: work.date,
        endAt: work.date,
        timezoneStartAt: 'Europe/Spain',
        summary: 'Trabajo',
        color: 'blue'
      };
      id++;

      if (date) {
        if (!calendar.events[date]) {
          calendar.events[date] = [];
        }
        calendar.events[date].push(event);
      }

    });
  }

  return (
    <IonContent>
      <Kalend
        onEventClick={() => {

        }}
        onNewEventClick={() => {}}
        events={calendar.events}
        initialDate={new Date().toISOString()}
        hourHeight={30}
        initialView={CalendarView.WEEK}
        disabledViews={[CalendarView.DAY]}
        // onSelectView={onSelectView}
        // selectedView={selectedView}
        // onPageChange={onPageChange}
      />
    </IonContent>
  );
};

export default Calendar;
