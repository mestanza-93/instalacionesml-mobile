interface CalendarEventInterface {
    id: number;
    startAt: string;
    endAt: string;
    timezoneStartAt: string;
    summary: string;
    color: string;
}

interface CalendarEventsInterface {
  events: {
    // [CalendarEventInterface]
  }
}

export default CalendarEventsInterface;