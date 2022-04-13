import React, { useEffect, useState } from "react";
import WorksListInterface from "../interfaces/WorksList";
import CalendarEventInterface from "../interfaces/CalendarEvent";
import FormatHelper from "../helpers/FormatHelper";
import WorkModel from "../models/Work";
import UrlHelper from "../helpers/UrlHelper";
import FilterInterface from "../interfaces/Filters";

import Kalend, { CalendarEvent, CalendarView, OnPageChangeData } from "kalend";
import "kalend/dist/styles/index.css";


const Calendar: React.FC<WorksListInterface> = (props) => {

  let worksProps = {} as WorksListInterface;
  worksProps = props;
  const [works, setWorks] = useState(worksProps.works);
  const [events, setEvents] = useState([] as CalendarEventInterface[]);
  const [changeEvent, setChangeEvent] = useState({} as OnPageChangeData);
  const [filters, setFilters] = useState({} as FilterInterface);

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

  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      console.table(filters);
      let newDate = WorkModel.GetWorksByDate(filters) ?? {};
      setWorks(newDate.works);

      setEvents([]);

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
        setEvents(events);
      }
    }
  }, [filters]);

  
  useEffect(() => {
    console.log(changeEvent);
    let filter = {} as FilterInterface;
    filters.sort = "DATE_DESC";
    filters.limit = 50;
    setFilters(filter);
  }, [changeEvent]);

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
      onPageChange={(event: OnPageChangeData) => {
        setChangeEvent(event);
      }}
      timeFormat={"24"}
      weekDayStart={"Monday"}
      language={"es"}
    />
  );
};

export default Calendar;
